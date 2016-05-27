const express = require('express');
const request = require('request');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();

if (isDeveloping) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');

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

  app.post('/v1/applications', (req, res, body) => {
    req.pipe(request.post('https://9b7457b5a16e6f69f5a688bd97030091:@api.greenhouse.io/v1/applications/', body)).pipe(res);
  });
} else {
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

  app.post('/v1/applications', (req, res, body) => {
    req.pipe(request.post('https://9b7457b5a16e6f69f5a688bd97030091:@api.greenhouse.io/v1/applications/', body)).pipe(res);
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
