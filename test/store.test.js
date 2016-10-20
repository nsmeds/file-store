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
