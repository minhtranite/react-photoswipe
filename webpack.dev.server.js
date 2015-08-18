var Server = require('./helper/server');
var path = require('path');
var config = require('./webpack.dev.config');

var options = {
  contentBase: path.join(__dirname, './example'),
  hot: true
};

Server(config, options, 'localhost', 3000);