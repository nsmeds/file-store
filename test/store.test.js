var store = require('../lib/store');
var assert = require('assert');
var storeDir = require('../lib/storeDirectory');
var mkdirp = require('mkdirp');
var fs = require('fs');


describe('makeDir method', () => {
  it('creates a new directory', done => {
    storeDir.makeDir();
    assert.ok(fs.existsSync('./store'));
    done();
  });
});
