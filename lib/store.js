'use strict';
var fs = require('fs');
var store = {};
var storeDir = require('./storeDirectory');

store.ids = [];

store.save = function(obj) {
  var jsonObj = JSON.stringify(obj);
  fs.writeFile('./store/' + obj.name +'.json', jsonObj, (err) => {
    if(err) return console.log(err);
    else console.log('we made a file', jsonObj);
    store.ids.push(obj.name);
    console.log(store.ids);
  });
};

store.get = function(name) {
  fs.readFile('./store/' + name + '.json', 'utf8', (err, data) => {
    if (err) return console.log(err);
    else {
      var resource = JSON.parse(data);
      console.log('We got ', resource);
    }
  });
};

var dog = {
  name: 'dog'
};

var cat = {
  name: 'flash'
};

storeDir.makeDir(cat, store.save);
store.get('dog');

module.exports = store;
