var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var storeDir = {};

storeDir.makeDir = function(obj, nextFunction) {
  mkdirp('./store', (err) => {
    if (err) console.log(err);
    else {
      console.log('We made a folder!');
      nextFunction(obj);
    }
  });
};

storeDir.deleteDir = function() {
  rimraf('./lib/store', function (err) {
    if (err) console.log(err);
    else console.log('We deleted a folder!');
  });
};

module.exports = storeDir;
