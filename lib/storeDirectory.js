var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var storeDir = {};

storeDir.makeDir = function(err, obj, nextFunction, finalFunction) {
  mkdirp('./store', (err) => {
    if (err) return console.log(err);
    else {
      console.log('We made a folder!');
      if (finalFunction) {
        nextFunction(obj, finalFunction);
      } else {
        nextFunction(obj);
      }
    }
  });
};

storeDir.deleteDir = function() {
  rimraf('./lib/store', function (err) {
    if (err) return console.log(err);
    else console.log('We deleted a folder!');
  });
};

module.exports = storeDir;
