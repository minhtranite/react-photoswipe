var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var bundle = require('./bundle');
var opn = require('opn');
var http = require('http');
var url = require('url');

var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});
var app = express();

module.exports = function (config, options, host, port) {
  config = config || {};
  options = options || {};
  host = host || 'localhost';
  port = port || 3000;
  var https = options.https || false;
  var publicPath = config.output.publicPath || '/';
  var bundlePort = port + 1;
  var bundleUrl = url.format({
    hostname: host,
    port: bundlePort,
    protocol: https ? 'https' : 'http'
  });
  var proxyOptions = options.proxy || [];
  delete options.proxy;

  bundle(config, options, host, bundlePort);

  proxyOptions.forEach(function (option) {
    app.all(option.path, function (req, res) {
      proxy.web(req, res, option, function (err) {
        console.log('Cannot proxy to ' + option.target);
        console.log(err.message);
        res.statusCode = 502;
        res.end();
      });
    });
  });

  app.all(publicPath + '*', function (req, res) {
    proxy.web(req, res, {target: bundleUrl}, function (err) {
      console.log('Cannot proxy to ' + bundleUrl);
      console.log(err.message);
      res.statusCode = 502;
      res.end();
    });
  });

  app.all('/socket.io*', function (req, res) {
    proxy.web(req, res, {target: bundleUrl}, function (err) {
      console.log('Cannot proxy to ' + bundleUrl);
      console.log(err.message);
      res.statusCode = 502;
      res.end();
    });
  });

  var server = http.createServer(app);

  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head, {target: bundleUrl});
  });

  server.listen(port, function () {
    var appUrl = url.format({
      hostname: host,
      port: port,
      protocol: https ? 'https' : 'http'
    });
    console.log('Listening at ' + appUrl);
    opn(appUrl);
  });
};
