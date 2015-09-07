var fs = require('fs-extra');
var path = require('path');
var replace = require('frep');
var webpackStatsHelper = require('../helper/webpack-stats-helper');

var indexAppPath = path.join(__dirname, '../app/index.html');
var indexDistPath = path.join(__dirname, '../dist/index.html');
var patterns = webpackStatsHelper.getReplacePatterns(path.join(__dirname, '../dist/webpack.stats.json'));

fs.readFile(indexAppPath, 'utf8', function (err, data) {
  if (err) {
    return console.error(err);
  }
  var result = replace.strWithArr(data, patterns);
  fs.writeFile(indexDistPath, result, 'utf8', function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('Create ' + indexDistPath);
  });
});