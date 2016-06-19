/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const AssetsPlugin = require('assets-webpack-plugin');
const multiLoader = require('multi-loader');

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
      'process.env.IN_BUNDLE': JSON.stringify(true),
    }),
    new ExtractTextPlugin('[name]-[contenthash].min.css'),
    new AssetsPlugin({ filename: 'bundlemap.json' }),
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
      // For scss and css, we're using multiLoader to inline AND extract styles.
      // Extracted css is linked in the head of server rendered html template
      // then, when react renders on the client, <style> tags are injected into doc head
      // and take precedence over linked. These injected styles then allow hot reloading.
      // TODO: add method to remove <link>ed stylesheet after client renders <style>s into
      // head to prevent conflicts with HMR removed classes that would still be in <link>
      {
        test: /\.scss?$/,
        loader: multiLoader(
          'style!raw!postcss!sass', // using !raw to prevent url refs from inlining.
          ExtractTextPlugin.extract(['css', 'postcss', 'sass']),
        ),
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css?$/,
        loader: multiLoader(
          'style!raw', // using !raw to prevent url refs from inlining.
          ExtractTextPlugin.extract(['css']),
        ),
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],
};
