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
    if(store.ids.indexOf(obj.name) === -1) {
      store.ids.push(obj.name);
      store.ids.sort();
    }
    cb();
  });
};

store.get = function(name, cb) {
  fs.readFile('./store/' + name + '.json', 'utf8', (err, data) => {
    if (err) return console.log(err);
    else {
      var resource = JSON.parse(data);
      cb(resource);
    }
  });
};

store.retrieveAll = function(array, cb) {
  array.forEach(function(name) {
    store.get(name, function(resource) {
      store.allResources.push(resource);
      if(store.allResources.length === store.ids.length) {
        store.allResources.sort(function(a, b) {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        cb();
      }
    });
  });
};

store.sortArray = function(cb) {
  store.ids.sort();
  cb();
};

module.exports = store;
