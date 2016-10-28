'use strict';
var fs = require('fs');
var store = {};
var storeDir = require('./storeDirectory');

store.ids = [];
store.allResources = [];

store.save = function(obj, cb) {
  var jsonObj = JSON.stringify(obj);
  storeDir.makeDir( () => {
    fs.writeFile('./store/' + obj.name +'.json', jsonObj, (err) => {
      if(err) return cb(err);
      if(store.ids.indexOf(obj.name) === -1) {
        store.ids.push(obj.name);
        store.ids.sort();
      }
      cb();
    });
  });
};

store.get = function(name, cb) {
  fs.readFile('./store/' + name + '.json', 'utf8', (err, data) => {
    if (err) return cb(err);
    else {
      var resource = JSON.parse(data);
      cb(resource);
    }
  });
};

store.retrieveAll = function(cb) {
  fs.readdir('./store', {encoding:'utf-8'}, (err, files) => {
    if(err) return cb(err);
    var resources = [];
    for(let i = 0; i < files.length; i++) {
      let fileName = files[i].split('.');
      store.get(fileName[0], resource => {
        resources[i] = resource;
        if(i === files.length - 1) {
          cb(resources);
        }
      });
    }
  });
};

module.exports = store;
