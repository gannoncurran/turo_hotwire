/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const AssetsPlugin = require('assets-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

console.log(
  'WEBPACK BUILDING FOR PRODUCTION',
  '\nprocess.env.NODE_ENV =', process.env.NODE_ENV, '\n'
);

module.exports = {
  devtool: false,
  entry: {
    main: [
      path.join(__dirname, 'src', 'client', 'index.jsx'),
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name]-[hash].min.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: 2,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new AssetsPlugin({ filename: 'bundlemap.json' }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false,
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
        loader: 'babel?cacheDirectory,presets[]=es2015,presets[]=react,presets[]=stage-0',
        include: path.join(__dirname, 'src'),
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
        loader: ExtractTextPlugin.extract(['css', 'postcss', 'sass']),
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css?$/,
        loader: ExtractTextPlugin.extract(['css']),
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
};
