var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var storeDir = {};

storeDir.makeDir = function(cb) {
  mkdirp('./store', function(err) {
    if(err) return cb(err);
    cb();
  });
};


storeDir.deleteDir = function(cb) {
  rimraf('./store', function (err) {
    if (err) return cb(err);
    cb();
  });
};

module.exports = storeDir;
