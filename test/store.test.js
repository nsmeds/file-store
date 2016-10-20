var store = require('../lib/store');
var storeDir = require('../lib/storeDirectory')
var assert = require('assert');
var fs = require('fs');

var dog = {
  name: 'buster',
  species: 'dog',
  weight: '150 lbs'
};

var cat = {
  name: 'flash',
  species: 'cat',
  weight: '10.5 lbs'
};

describe('saves', function(done) {
  it('saves store resource', (done) => {
    storeDir.makeDir(dog, function(err, animal) {
      if (err) return done(err);
      store.save(animal, function() {
        if (err) return done(err);
        done();
      });
    });
  });
  done();
});
// describe('retrieves', function(done) {
//   it('gets store resource', (done) => {
//     store.get(dog.name);
//     if (err) return done(err);
//   });
//   done();
// });