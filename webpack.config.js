var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-stylus');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, '/public/build'),
    filename: 'main.js',
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css-loader!stylus-loader'),
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          optional: [
            'runtime',
          ],
        },
      },
    ],
  },
  resolve: {
    alias: {
      config: path.join(__dirname, '/config'),
      lib: path.join(__dirname, '/src/lib'),
      style: path.join(__dirname, '/src/style'),
      layouts: path.join(__dirname, '/src/layouts'),
      components: path.join(__dirname, '/src/components'),
      sections: path.join(__dirname, '/src/sections'),
    },
  },
  stylus: {
    use: [autoprefixer({ browsers: ['> 5%'] })],
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
};
