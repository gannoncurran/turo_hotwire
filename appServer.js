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
import routes from './src/routes';

const __PROD__ = process.env.NODE_ENV === 'production';
const app = express();

const index = fs.readFileSync('./src/index.tpl.html', 'utf8');
const compileIndex = template(index);

app.disable('x-powered-by');
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'assets')));

if (__PROD__) {
  console.log('PRODUCTION: Serving static files from assets/ and built files from public/');
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  console.log('DEVELOPMENT: Serving with WebPack Middleware');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./webpack.config.js');
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
  const history = createMemoryHistory(req.path);
  const data = {};
  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      data.html = renderToString(<RouterContext {...renderProps} />);
      const templateData = __PROD__ ? { data, assets: require('./assets.json') } : { data };
      res.send(compileIndex(templateData));
    } else {
      res.status(404).send('Saaaad. Not found');
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
