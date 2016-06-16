/* eslint-disable no-console, global-require */
const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// check compression and compression options as site grows to make sure it's reducing
// overall page render time -- compare mobile on slow connection vs desktop etc.
// const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const template = require('lodash.template');

const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();

if (isDeveloping) {
  console.log('DEVELOPMENT: Serving with WebPack Middleware');
  const webpack = require('webpack');
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
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const devMiddleware = webpackDevMiddleware(compiler, webpackDevMiddlewareOptions);

  app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(devMiddleware);
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
  }));
  app.use(express.static(path.join(__dirname, 'assets')));
  app.get('*', (req, res) => {
    const index = fs.readFileSync('./src/index.tpl.html', 'utf8');
    const compileIndex = template(index);
    // TODO: change data.html object so it contains reactRenderToString data
    const data = {};
    data.html = '<div>YES</div>';
    res.send(compileIndex({ data }));
  });
} else {
  console.log('PRODUCTION: Serving static files from assets/ and built files from public/');
  app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
  app.use(logger('dev'));
  // app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'assets')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    const assets = require('./assets');
    const index = fs.readFileSync('./src/index.tpl.html', 'utf8');
    const compileIndex = template(index);
    // TODO: change data.html object so it contains reactRenderToString data
    const data = {};
    data.html = '<div>YES</div>';
    res.send(compileIndex({ data, assets }));
  });
}
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
