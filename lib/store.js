'use strict';
var fs = require('fs');
var store = {};
var storeDir = require('./storeDirectory');

store.ids = [];
store.allResources = [];

store.save = function(obj, cb) {
  var jsonObj = JSON.stringify(obj);
  fs.writeFile('./store/' + obj.name +'.json', jsonObj, (err) => {
    if(err) return console.log(err);
    else console.log('we made a file', jsonObj);
    if(store.ids.indexOf(obj.name) === -1) {
      store.ids.push(obj.name);
    }
    console.log(store.ids);
    cb();
  });
};

store.get = function(name, cb) {
  fs.readFile('./store/' + name + '.json', 'utf8', (err, data) => {
    if (err) return console.log(err);
    else {
      var resource = JSON.parse(data);
      console.log('We got ', resource);
      cb(resource);
    }
  });
};

store.retrieveAll = function(array, cb) {
  array.forEach(function(name) {
    store.get(name, function(resource) {
      console.log('our resource', resource);
      store.allResources.push(resource);
    });
  });
  cb();
};

store.sortArray = function(cb) {
  store.ids.sort();
  cb();
};

// var dog = {
//   name: 'blazer',
//   breed: 'boxer',
//   age: '9'
// };

// store.save('dog', err => {
//   if (err) return console.log(err);
//   console.log('success');
// });

// store.get(dog.name, (resource) => {
//   console.log('We returned ', resource);
// });

module.exports = store;
