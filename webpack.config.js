var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');
var camelCase = require('camelcase');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
    library: capitalizeFirstLetter(camelCase(pkg.name)),
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: loaders
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  plugins: plugins
};