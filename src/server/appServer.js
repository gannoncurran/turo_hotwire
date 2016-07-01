
/* eslint-disable no-console, global-require, no-underscore-dangle */
import fs from 'fs';
import path from 'path';
import express from 'express';
import request from 'request';
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
import { trigger } from 'redial';

import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';

import ReactHelmet from 'react-helmet';
let rHCompiled;

const __projectRoot = path.join(__dirname, '../..');

const __PROD__ = process.env.NODE_ENV === 'production';
const app = express();

const index = fs.readFileSync('./src/index.tpl.html', 'utf8');
const compileIndex = template(index);

let firstLoad = true;

app.disable('x-powered-by');
app.use(favicon(path.resolve(__projectRoot, 'assets', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(compression());

console.log('PRODUCTION: Serving static files from assets/');
app.use(express.static(
  path.resolve(__projectRoot, 'assets'),
  { maxAge: 365 * 24 * 60 * 60 * 1000 }
));

if (__PROD__) {
  console.log('PRODUCTION: Serving built files from public/');
  app.use(express.static(
    path.resolve(__projectRoot, 'public'),
    { maxAge: 365 * 24 * 60 * 60 * 1000 }
  ));
} else {
  console.log('DEVELOPMENT: Serving with WebPack Middleware');
  const webpack = require('webpack');
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

app.get('/api/v0/*', (req, res) => {
  const routeSegment = req.path.replace('/api/v0/', '');
  req.pipe(
    request
      .get(`http://localhost:8080/${routeSegment}`)
      .on('error', (error) => {
        console.log('Server Error', error);
        res.status(500).send(error.message);
      })
  ).pipe(res);
});

app.post('/api/v0/*', (req, res) => {
  const routeSegment = req.path.replace('/api/v0/', '');
  req.pipe(
    request
      .post(`http://localhost:8080/${routeSegment}`)
      .on('error', (error) => {
        console.log('Server Error', error);
        res.status(500).send(error.message);
      })
  ).pipe(res);
});

app.get('*', (req, res) => {
  // bust node's require.cache while in development to allow rendering of updated modules
  if (!__PROD__ && !firstLoad) {
    console.log('DEVELOPMENT: Recompiling source for server-side render.');
    const modIDs = Object.keys(require.cache);
    modIDs.map((id) => {
      if (id.indexOf('/src/') !== -1) delete require.cache[id];
      return false;
    });
  }
  firstLoad = false;
  // require routes here to pull in updated modules after cache bust above
  const routes = require('../common/routes/root').default;
  const store = configureStore();
  const { dispatch, getState } = store;
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
      const { components } = renderProps;
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        dispatch,
      };
      trigger('fetch', components, locals)
        .then(() => {
          data.html = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          rHCompiled = ReactHelmet.rewind();
          head.title = rHCompiled.title.toString();
          head.meta = rHCompiled.meta.toString();
          res.send(compileIndex({
            head,
            data,
            assets,
            preloadedState: JSON.stringify(getState()),
          }));
        })
        .catch(console.log.bind(console));
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
