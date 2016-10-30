const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const storeDir = {};

storeDir.makeDir = cb => {
  mkdirp('./store', function(err) {
    if(err) return cb(err);
    cb();
  });
};


storeDir.deleteDir = cb => {
  rimraf('./store', function (err) {
    if (err) return cb(err);
    cb();
  });
};

module.exports = storeDir;
