/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

console.log('WEBPACKing FOR DEVELOPMENT\n');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src', 'index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.css',
      '.scss',
    ],
    modulesDirectories: ['src', 'node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules|server)/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.json/,
        loader: 'json',
        include: [
          path.join(__dirname, 'src'),
        ],
      },
      {
        test: /\.scss?$/,
        loader: 'style!raw!postcss!sass', // using !raw to prevent url refs from inlining.
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css?$/,
        loader: 'style!raw', // using !raw to prevent url refs from inlining.
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
};
