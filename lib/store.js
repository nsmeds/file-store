'use strict';
var fs = require('fs');
var store = {};
var storeDir = require('./storeDirectory');

store.save = function(obj) {
  var jsonObj = JSON.stringify(obj);
  fs.writeFile('./store/' + obj.name +'.json', jsonObj, (err) => {
    if(err) return console.log(err);
    else console.log('we made a file', jsonObj);
  });
};


var dog = {
  name: 'dog'
};

storeDir.makeDir(dog, store.save);
// store.save(dog);

module.exports = store;
