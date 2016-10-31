const store = require('../lib/store');
const assert = require('assert');
const storeDir = require('../lib/storeDirectory');
const fs = require('fs');

describe('saving object', () => {
  let dog = {
    name: 'blazer',
    breed: 'boxer',
    age: '9'
  };
  let cat = {
    name: 'whiskers',
    breed: 'sphinx',
    age: '100'
  };

  let bird = {
    name: 'captain',
    breed: 'parrot',
    age: '86'
  };

  let rabbit = {
    name: 'fluffy',
    breed: 'lop',
    age: '2'
  };

  let aardvark = {
    name: 'arthur',
    weight: '45lbs',
    color: 'tan'
  };

  const moreObjects = [cat, bird, rabbit, aardvark];

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

  it('correctly handles bad get requests', done => {
    store.get('badname', err => {
      if (err.code) {
        assert.ok(err);
        done();
      } else {
        assert.equal(1,0);
      }
    });
  });

  moreObjects.forEach(obj => {
    store.save(obj, () => {});
  });

  it('retrieves all resources', done => {
    store.retrieveAll(resources => {
      let names = resources.map((obj) => obj.name);
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
