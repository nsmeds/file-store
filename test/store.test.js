var store = require('../lib/store');
var assert = require('assert');
var storeDirectory = require('../lib/storeDirectory');
var mkdirp = require('mkdirp');
var fs = require('fs');


describe('makeDir method', () => {
  it('creates a new directory', done => {
    mkdirp('./store', err => {
      if(err) {
        console.log(err);
        done(err);
      } else {
        console.log('we made a directory!');
        assert.ok(fs.existsSync('./store'));
        done();
      }
    });
  });
});
