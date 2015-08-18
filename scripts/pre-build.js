var fs = require('fs');
var path = require('path');

function rmDir(dirPath) {
  try {
    var files = fs.readdirSync(dirPath);
  }
  catch (e) {
    return;
  }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        rmDir(filePath);
    }
  fs.rmdirSync(dirPath);
}

console.log('Clean ./dist');
rmDir(path.join(__dirname, '../dist'));
fs.mkdirSync(path.join(__dirname, '../dist'));