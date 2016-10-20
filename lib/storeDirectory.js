var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var storeDir = {};

// storeDir.makeDir = function(obj, nextFunction) {
//   mkdirp('./store', (err) => {
//     if (err) console.log(err);
//     else {
//       console.log('We made a folder!');
//       nextFunction(obj);
//     }
//   });
// };

storeDir.makeDir = function(cb) {
  mkdirp('./store', function(err) {
    if(err) return console.log(err);
    else console.log('we made a folder');
    cb();
  });
};



storeDir.deleteDir = function(cb) {
  rimraf('./store', function (err) {
    if (err) return console.log(err);
    else console.log('We deleted a folder!');
    cb();
  });
};

// storeDir.makeDir();

module.exports = storeDir;
