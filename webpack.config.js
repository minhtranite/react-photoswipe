var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  }));
  plugins.push(new webpack.optimize.DedupePlugin());
}

var loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader'
  }
];

module.exports = {
  output: {
    filename: pkg.name + '.js',
    library: pkg.name,
    libraryTarget: 'umd'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  plugins: plugins
};