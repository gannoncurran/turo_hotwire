
/* eslint-disable no-console, global-require, no-underscore-dangle */
import fs from 'fs';
import path from 'path';
import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import template from 'lodash.template';
import compression from 'compression';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, createMemoryHistory, match } from 'react-router';

import ReactHelmet from 'react-helmet';
let rHCompiled;

const __projectRoot = path.join(__dirname, '../..');

const __PROD__ = process.env.NODE_ENV === 'production';
const app = express();

const index = fs.readFileSync('./src/index.tpl.html', 'utf8');
const compileIndex = template(index);

app.disable('x-powered-by');
app.use(favicon(path.resolve(__projectRoot, 'assets', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(compression());
app.use(express.static(path.resolve(__projectRoot, 'assets')));

if (__PROD__) {
  console.log('PRODUCTION: Serving static files from assets/ and built files from public/');
  app.use(express.static(path.resolve(__projectRoot, 'public')));
} else {
  console.log('DEVELOPMENT: Serving with WebPack Middleware');
  const webpack = require('webpack');
  const Watchpack = require('watchpack');

  // watch for module changes, bust node require() cache so
  // that SSR and HMR match between server restarts
  const wp = new Watchpack({ aggregateTimeout: 200 });
  wp.watch([], ['./src'], Date.now() - 10000);
  wp.on('change', (filename) => {
    const moduleIdent = path.resolve(__projectRoot, filename);
    const routesIdent = require.resolve('../common/routes/routes.jsx');
    delete require.cache[moduleIdent];
    delete require.cache[routesIdent];
  });

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../../webpack.config.js');
  const webpackDevMiddlewareOptions = {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: true,
      modules: false,
    },
  };
  const compiler = webpack(webpackConfig);
  const devMiddleware = webpackDevMiddleware(compiler, webpackDevMiddlewareOptions);
  app.use(devMiddleware);
  app.use(webpackHotMiddleware(compiler, { log: console.log }));
}

app.get('*', (req, res) => {
  const routes = require('../common/routes/routes.jsx').default;
  const history = createMemoryHistory(req.path);
  const head = {};
  const data = {};
  const assets = JSON.parse(
    fs.readFileSync(path.resolve(__projectRoot, 'bundlemap.json'), 'utf8')
  );

  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      data.html = renderToString(<RouterContext {...renderProps} />);
      rHCompiled = ReactHelmet.rewind();
      head.title = rHCompiled.title.toString();
      head.meta = rHCompiled.meta.toString();
      res.send(compileIndex({ head, data, assets }));
    } else {
      res.status(404).send('Not found');
    }
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('404: Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
