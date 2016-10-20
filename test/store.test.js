var store = require('../lib/store');
var assert = require('assert');
var storeDir = require('../lib/storeDirectory');
var mkdirp = require('mkdirp');
var fs = require('fs');

describe('makeDir method', () => {
  it('deletes an existing directory', done => {
    storeDir.deleteDir(function() {
      assert.equal(fs.existsSync('./store'), false);
      done();
    });
  });

  it('creates a new directory', done => {
    storeDir.makeDir(function() {
      assert.ok(fs.existsSync('./store'));
      done();
    });
  });
});

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
});