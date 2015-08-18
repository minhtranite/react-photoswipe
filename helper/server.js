var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var bundle = require('./bundle');
var opn = require('opn');
var http = require('http');
var portscanner = require('portscanner');


var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});
var app = express();

module.exports = function (config, options, host, port) {
  portscanner.findAPortNotInUse(port, port + 998, '127.0.0.1', function (error, newPort) {
    if (error) {
      console.log(error);
    }
    port = newPort;
    var publicPath = config.output.publicPath || '/';
    var bundlePort = port + 1;
    var bundleUrl = 'http://' + host + ':' + bundlePort;
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

    //server.on('upgrade', function (req, socket, head) {
    //  proxy.ws(req, socket, head);
    //});

    server.listen(port, function () {
      console.log('Listening at http://' + host + ':' + port);
      opn('http://' + host + ':' + port);
    });
  });
};

