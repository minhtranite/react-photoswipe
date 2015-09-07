var glob = require('glob');
var path = require('path');
var fs = require('fs-extra');
var sass = require('node-sass');
var async = require('async');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var CleanCSS = require('clean-css');

var srcPath = path.join(__dirname, '../src');
var libPath = path.join(__dirname, '../lib');
var distPath = path.join(__dirname, '../dist');
var autoprefixerBrowsers = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

glob(path.join(srcPath, './*.scss'), {ignore: path.join(srcPath, './_*.scss')}, function (globError, files) {
  if (globError) {
    return console.error(globError);
  }
  async.each(files, function (file, callback) {
    var pathInfo = path.parse(file);
    var libFile = libPath + '/' + pathInfo.name + '.css';
    var distFile = distPath + '/' + pathInfo.name + '.css';
    var distFileMin = distPath + '/' + pathInfo.name + '.min.css';
    sass.render({
      file: file,
      outputStyle: 'expanded'
    }, function (sassError, sassResult) {
      if (sassError) {
        callback(sassError);
      } else {
        postcss([autoprefixer({browsers: autoprefixerBrowsers})])
          .process(sassResult.css)
          .then(function (autoprefixerResult) {
            autoprefixerResult.warnings().forEach(function (warn) {
              console.warn(warn.toString());
            });
            fs.writeFile(libFile, autoprefixerResult.css, 'utf8', function (writeLibFileError) {
              if (writeLibFileError) {
                callback(writeLibFileError);
              } else {
                console.log('Create ' + libFile);
                fs.writeFile(distFile, autoprefixerResult.css, 'utf8', function (writeDistFileError) {
                  if (writeDistFileError) {
                    callback(writeDistFileError);
                  } else {
                    console.log('Create ' + distFile);
                    new CleanCSS().minify(autoprefixerResult.css, function (minifyError, minified) {
                      if (minifyError) {
                        callback(minifyError);
                      } else {
                        fs.writeFile(distFileMin, minified.styles, 'utf8', function (writeDistFileMinError) {
                          if (writeDistFileMinError) {
                            callback(writeDistFileMinError);
                          } else {
                            console.log('Create ' + distFileMin);
                            callback();
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          })
          .catch(function (autoprefixerError) {
            callback(autoprefixerError);
          });
      }
    });
  }, function (asyncError) {
    if (asyncError) {
      return console.error(asyncError);
    }
  });
});