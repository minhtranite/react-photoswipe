var webpack = require('webpack');
var path = require('path');

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
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  plugins: plugins
};
