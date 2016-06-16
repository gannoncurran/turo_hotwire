/* eslint-disable no-console, global-require, no-underscore-dangle */
const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const template = require('lodash.template');
const compression = require('compression');

const __PROD__ = process.env.NODE_ENV === 'production';
console.log('PRODUCTION:', __PROD__);
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
  const assets = require('./assets');
  // TODO: change data.html object so it contains reactRenderToString data
  const data = {};
  data.html = '<div>YES</div>';
  const templateData = __PROD__ ? { data, assets } : { data };
  res.send(compileIndex(templateData));
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
