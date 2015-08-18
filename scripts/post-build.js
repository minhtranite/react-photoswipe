var fs = require('fs');
var path = require('path');
var replace = require('frep');
var webpackStatsHelper = require('../helper/webpack-stats-helper');

var indexAppPath = path.join(__dirname, '../example/index.html');
var indexDistPath = path.join(__dirname, '../dist/index.html');
var patterns = webpackStatsHelper.getReplacePatterns(path.join(__dirname, '../dist/webpack.stats.json'));

fs.readFile(indexAppPath, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log('Process index.html');
  var result = replace.strWithArr(data, patterns);

  fs.writeFile(indexDistPath, result, 'utf8', function (err) {
    if (err) return console.log(err);
    console.log('Create ./dist/index.html');
  });
});