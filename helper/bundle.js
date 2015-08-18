var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var objectAssign = require('object-assign');
var portscanner = require('portscanner');

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

  options = objectAssign(defaultOptions, options || {});

  host = host || 'localhost';
  port = port || 3001;

  portscanner.findAPortNotInUse(port, port + 997, '127.0.0.1', function (error, newPort) {
    if (error) {
      console.log(error);
    }
    port = newPort;
    var webpackDevServer = new WebpackDevServer(webpack(config), options);

    webpackDevServer.listen(port, host, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Bundling project, please wait...');
      }
    });
  });
};