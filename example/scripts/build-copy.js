var glob = require('glob');
var path = require('path');
var fs = require('fs-extra');
var async = require('async');

var appPath = path.join(__dirname, '../app');
var distPath = path.join(__dirname, '../dist');

glob(path.join(appPath, './*'), {
  ignore: path.join(appPath, './*.{html,js}'),
  nodir: true
}, function (globError, files) {
  if (globError) {
    return console.error(globError);
  }
  async.each(files, function (file, callback) {
    var pathInfo = path.parse(file);
    pathInfo.dir = distPath;
    var outFile = path.format(pathInfo);
    fs.copy(file, outFile, function (copyError) {
      if (copyError) {
        callback(copyError)
      } else {
        console.log('Create ' + outFile);
        callback();
      }
    });
  }, function (asyncError) {
    if (asyncError) {
      return console.error(asyncError);
    }
  });
});