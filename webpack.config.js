const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src', 'index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
        loader: 'react-hot!babel?cacheDirectory,presets[]=es2015,presets[]=react,presets[]=stage-0',
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
        loader: 'style!raw!postcss!sass', // using !raw to prevent url refs from inlining.
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
};
