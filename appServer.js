const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();

if (isDeveloping) {
  console.log('DEVELOPMENT: Serving with WebPack Middleware'); // eslint-disable-line no-console
  const webpack = require('webpack'); // eslint-disable-line global-require
  const webpackMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require, max-len
  const config = require('./webpack.config.js'); // eslint-disable-line global-require

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.join(__dirname, 'assets')));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public', 'index.html')));
    res.end();
  });
} else {
  console.log('PRODUCTION: Serving built files from public/index.html'); // eslint-disable-line no-console, max-len
  app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'assets')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
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
}

module.exports = app;
