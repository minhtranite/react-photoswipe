var Server = require('./helper/server');
var path = require('path');
var config = require('./webpack.preview.config');

var options = {
  contentBase: path.join(__dirname, './example')
};

Server(config, options, 'localhost', 8080);