var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var merge = require('lodash.merge');

module.exports = function (config, options, host, port) {
  var defaultOptions = {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: {
      colors: true,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: false,
      version: true,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: false
    }
  };

  options = merge(defaultOptions, options || {});
  host = host || 'localhost';
  port = port || 3001;

  var webpackDevServer = new WebpackDevServer(webpack(config), options);

  webpackDevServer.listen(port, host, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Bundling project, please wait...');
    }
  });
};
