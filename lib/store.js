'use strict';
const fs = require('fs');
const store = {};
const storeDir = require('./storeDirectory');

store.ids = [];
store.allResources = [];

store.save = (obj, cb) => {
  let jsonObj = JSON.stringify(obj);
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

store.get = (name, cb) => {
  fs.readFile('./store/' + name + '.json', 'utf8', (err, data) => {
    if (err) return cb(err);
    else {
      let resource = JSON.parse(data);
      cb(resource);
    }
  });
};

store.retrieveAll = cb => {
  fs.readdir('./store', {encoding:'utf-8'}, (err, files) => {
    if(err) return cb(err);
    let resources = [];
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
