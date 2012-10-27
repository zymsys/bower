var Manager = require('../lib/core/manager');
var install    = require('../lib/commands/install');
var config  = require('../lib/core/config');
var events  = require('events');
var assert  = require('assert');
var rimraf  = require('rimraf');

describe('install', function () {

  it('Should have line method', function () {
    assert(!!install.line);
  });

  it('Should return an emiter', function (next) {
    var emitter = install(['jquery']);
    assert(emitter instanceof events.EventEmitter);
    emitter.on('end', function () {
      next();
    });
  });

  it('Should emit end event', function (next) {
    var emitter = install(['some-dummy-package-that-will-never-exist', 'another-dummy-package-that-will-never-exist']);
    emitter.on('error', function () {});
    emitter.on('end', function () {
      next();
    });
  });

});