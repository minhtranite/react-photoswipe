var glob = require('glob');
var path = require('path');
var fs = require('fs-extra');
var async = require('async');

var srcPath = path.join(__dirname, '../src');
var libPath = path.join(__dirname, '../lib');
var distPath = path.join(__dirname, '../dist');

glob(path.join(srcPath, './**/*'), {ignore: path.join(srcPath, './**/*.{scss,js}')}, function (globError, files) {
  if (globError) {
    return console.error(globError);
  }
  async.each(files, function (file, callback) {
    var pathInfo = path.parse(file);
    var libFile = libPath + '/' + pathInfo.base;
    var distFile = distPath + '/' + pathInfo.base;
    fs.copy(file, libFile, function (copyToLibError) {
      if (copyToLibError) {
        callback(copyToLibError);
      } else {
        console.log('Create ' + libFile);
        fs.copy(file, distFile, function (copyToDistError) {
          if (copyToDistError) {
            callback(copyToDistError);
          } else {
            console.log('Create ' + distFile);
            callback();
          }
        });
      }
    });
  }, function (asyncError) {
    if (asyncError) {
      return console.error(asyncError);
    }
  });
});