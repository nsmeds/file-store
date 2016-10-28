var store = require('../lib/store');
var assert = require('assert');
var storeDir = require('../lib/storeDirectory');
var fs = require('fs');

describe('saving object', () => {
  var dog = {
    name: 'blazer',
    breed: 'boxer',
    age: '9'
  };
  var cat = {
    name: 'whiskers',
    breed: 'sphinx',
    age: '100'
  };

  var bird = {
    name: 'captain',
    breed: 'parrot',
    age: '86'
  };

  var rabbit = {
    name: 'fluffy',
    breed: 'lop',
    age: '2'
  };

  var aardvark = {
    name: 'arthur',
    weight: '45lbs',
    color: 'tan'
  };

  var moreObjects = [cat, bird, rabbit, aardvark];

  it('creates a file for the object', done => {
    store.save(dog, () => {
      assert.ok(fs.existsSync('./store/blazer.json'));
      done();
    });
  });

  it('retrieves an existing file', done => {
    store.get(dog.name, (resource) => {
      assert.deepEqual(resource, dog);
      done();
    });
  });

  moreObjects.forEach(obj => {
    store.save(obj, () => {});
  });

  it('retrieves all resources', done => {
    store.retrieveAll(resources => {
      console.log(typeof resources);
      var names = resources.map((obj) => obj.name);
      // console.log(names);
      assert.equal(names, 'arthur,blazer,captain,fluffy,whiskers');
      done();
    });
  });

  after(done => {
    storeDir.deleteDir(err => {
      if(err) return done(err);
      done();
    });
  });
});
