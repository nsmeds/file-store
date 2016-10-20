'use strict';
var fs = require('fs');
var store = {};
var storeDir = require('./storeDirectory');

store.ids = [];

store.save = function(obj, nextFunction) {
  var jsonObj = JSON.stringify(obj);
  fs.writeFile('./store/' + obj.name +'.json', jsonObj, (err) => {
    if(err) return nextFunction(err);
    else console.log('we made a file', jsonObj);
    store.ids.push(obj.name);
    console.log(store.ids);
    if (nextFunction) {
      nextFunction(null, obj.name);
    }
  });
};

store.get = function(name) {
  fs.readFile('./store/' + name + '.json', 'utf8', (err, data) => {
    if (err) return console.log(err);
    else {
      var resource = JSON.parse(data);
      console.log('We got ', resource);
      return resource;
    }
  });
};

// var dog = {
//   name: 'buster',
//   species: 'dog',
//   weight: '150 lbs'
// };

// console.log(storeDir.makeDir(dog, store.save, store.get));
// storeDir.makeDir(cat, store.save);
// store.get('dog');

module.exports = store;
