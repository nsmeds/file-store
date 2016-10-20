'use strict';
var fs = require('fs');
var store = {};
var storeDir = require('./storeDirectory');

store.ids = [];

store.save = function(obj, cb) {
  var jsonObj = JSON.stringify(obj);
  fs.writeFile('./store/' + obj.name +'.json', jsonObj, (err) => {
    if(err) return console.log(err);
    else console.log('we made a file', jsonObj);
    store.ids.push(obj.name);
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
