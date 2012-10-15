var assert = require('assert');
var Thrive = require('../');
var sinon = require('sinon');
var Subs = require('subs');


suite('Thrive', function() {

  suite('events', function() {
    var Cls;

    beforeEach(function() {
      Cls = Thrive.extend();
    });

    suite('instance', function() {
      
      test('Thrive instances should inherit everything from Subs', function() {
        var t = new Cls();

        for (var prop in Subs.prototype) {
          assert.equal(typeof t[prop], 'function');
        }

      });

      test('should emit events', function() {
        var t = new Cls();
        var spy = sinon.spy();
        t.on('test', spy);
        t.emit('test');
        assert.ok(spy.called);
      });

      test('instance events should only trigger on those instances', function() {
        var t1 = new Cls();
        var t2 = new Cls();
        
        assert.notEqual(t1._handlers, t2._handlers);
        var spy = sinon.spy();

        t1.on('test', spy);
        t2.emit('test');

        assert.equal(spy.called, false)
      });
    });

    suite('static', function() {

      test('Thrive static should have on and emit', function() {
        assert.equal(typeof Cls.on, 'function');
        assert.equal(typeof Cls.emit, 'function');
      });

      test('should emit events', function() {
        var spy = sinon.spy();
        Cls.on('test', spy);
        Cls.emit('test');
        assert.ok(spy.called);
      });

      test('instance events should only trigger on those instances', function() {
        var Cls2 = Thrive.extend();
        var spy = sinon.spy();

        Cls.on('test', spy);
        Cls2.emit('test');

        assert.equal(spy.called, false)
      });
      
    });
    
    suite('global', function() {
      test('Thrive static should have on and emit', function() {
        assert.equal(typeof Thrive.on, 'function');
        assert.equal(typeof Thrive.emit, 'function');
      });

      test('should emit events', function() {
        var spy = sinon.spy();
        Thrive.on('test', spy);
        Thrive.emit('test');
        assert.ok(spy.called);
      });

      test('instance events should only trigger on those instances', function() {
        var Cls = Thrive.extend();
        var spy = sinon.spy();

        Cls.on('test', spy);
        Thrive.emit('test');

        assert.equal(spy.called, false)
      });

    });
    
    
  });
});
