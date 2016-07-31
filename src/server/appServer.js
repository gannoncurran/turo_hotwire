
/* eslint-disable no-console, global-require, no-underscore-dangle */
import fs from 'fs';
import path from 'path';
import express from 'express';
import request from 'request';
import helmet from 'helmet';
// import enforce from 'express-sslify';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import template from 'lodash.template';
import compression from 'compression';

import buildApiQuery from '../common/helpers/buildApiQuery';
import { parseString } from 'xml2js';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, createMemoryHistory, match } from 'react-router';
import { trigger } from 'redial';

import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';

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
app.use(logger('dev'));
app.use(helmet());
app.use(compression());

app.use(bodyParser.json());

console.log('Serving static files from assets/');
app.use(express.static(
  path.resolve(__projectRoot, 'assets'),
  { maxAge: 365 * 24 * 60 * 60 * 1000 }
));

if (__PROD__) {
  console.log('PRODUCTION: Serving built files from public/');
  // app.use(enforce.HTTPS({ trustProtoHeader: true })); // eslint-disable-line new-cap
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

// http://api.hotwire.com/v1/search/car?apikey=dd7s3wvhwh5esdjxe3g54289&dest=LAX&startdate=04/20/2017&enddate=04/23/2017&pickuptime=10:00&dropofftime=13:30
app.get('/api/v1/*', (req, res) => {
  const rawQuery = req.path.replace('/api/v1/', '');
  // const apiKey = process.env.API_KEY;
  const apiKey = 'dd7s3wvhwh5esdjxe3g54289';
  const fullUrl = `http://api.hotwire.com/v1/search/car?apikey=${apiKey}${buildApiQuery(rawQuery)}`;
  request(
    fullUrl,
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        parseString(body, (err, result) => {
          res.json({ op: 'carssearch', success: true, apiResponse: result.Hotwire });
        });
      } else {
        res.json({ op: 'carssearch', success: false, errorMessage: 'Hotwire API failure.' });
      }
    }
  );
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
  const ssrInitialState = {
    sourceRequest: {
      protocol: req.headers['x-forwarded-proto'] || req.protocol,
      host: req.headers.host,
    },
  };
  const store = configureStore(ssrInitialState);
  const { dispatch, getState } = store;
  // const routes = require('../common/routes/root').default;
  const getRoutes = require('../common/routes/getRoutes').default;
  const routes = getRoutes();
  const memoryHistory = createMemoryHistory(req.path);
  const history = syncHistoryWithStore(memoryHistory, store);

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
