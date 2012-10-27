var Manager = require('../lib/core/manager');
var list    = require('../lib/commands/list');
var config  = require('../lib/core/config');
var events  = require('events');
var assert  = require('assert');
var rimraf  = require('rimraf');

describe('list', function () {

  before(function (next) {
    // Setup some packages
    var manager = new Manager([]);
    manager.cwd = __dirname + '/assets/project';

    manager.on('resolve', function () {
      assert.ok(manager.dependencies['jquery'][0]);
      assert.ok(manager.dependencies['package-bootstrap'][0]);
      assert.ok(manager.dependencies['jquery-ui'][0]);

      next();
    });

    manager.on('error', function (err) {
      throw new Error(err);
    });

    manager.resolve();
  });


  it('Should have line method', function () {
    assert(!!list.line);
  });

  it('Should return an emiter', function (next) {
    var emitter = list();
    assert(emitter instanceof events.EventEmitter);
    emitter.on('end', function () {
      next();
    });
  });

  it('Should emit end event', function (next) {
    list().on('end', function () {
      next();
    });
  });

  it('Should emit end event when using the --paths option', function (next) {
    list({ paths: true }).on('end', function () {
      next();
    });
  });

  it('Should emit end event when using the --map option', function (next) {
    list({ map: true }).on('end', function () {
      next();
    });
  });

});