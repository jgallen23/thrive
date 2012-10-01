var assert = require('assert')

var Obbie = require('../');

suite('obbie', function() {
  

  suite('#extend', function() {

    test('init is called', function() {
      var Cls = Obbie.extend({
        init: function() {
          this.initWasCalled = true;
        }
      });
      var ob = new Cls();

      assert.equal(ob.initWasCalled, true);
    });

    test('pass in params', function() {
      var Cls = Obbie.extend({});
      var ob = new Cls({ test: false, debug: true });

      assert.equal(ob.test, false);
      assert.equal(ob.debug, true);
      
    });

    test('instanceof', function() {

      var Cls = Obbie.extend({});

      var c = new Cls();
      assert.equal(c instanceof Cls, true);
      assert.equal(c instanceof Obbie, true);
    });

  });

  suite('inheritance', function() {

    test('basic inheritance', function() {

      var Foo = Obbie.extend({
        fooMethod: function() {
          this.fooMethodWasCalled = true;
        }
      });

      var Bar = Foo.extend({
        barMethod: function() {
          this.fooMethod();
        }
      });

      var bar = new Bar();
      bar.barMethod();

      assert.equal(bar.fooMethodWasCalled, true);
      
    });

    test('calling super', function() {
      var Foo = Obbie.extend({
        fooMethod: function() {
          this.fooMethodWasCalled = true;
        }
      });

      var Bar = Foo.extend({
        fooMethod: function() {
          Foo.prototype.fooMethod.call(this);
        }
      });

      var bar = new Bar();
      bar.fooMethod();

      assert.equal(bar.fooMethodWasCalled, true);
      
    });
    
  });
  
  suite('extending Obbie', function() {

    test('adding to prototype', function() {
      Obbie.prototype.testMe = function() {
        this.testMeWasCalled = true;
      }
      var Foo = Obbie.extend({});
      var foo = new Foo();
      foo.testMe();
      assert.equal(foo.testMeWasCalled, true);
      
    });
    
  });
  
  suite('#proxy', function() {
    test('maintain scope', function(done) {

      var Foo = Obbie.extend({
        init: function() {
          setTimeout(this.proxy(this.method, 1, 2, 3), 10);
        },
        method: function(arg1, arg2, arg3) {
          assert.equal(this instanceof Foo, true);
          assert.equal(arg1, 1);
          assert.equal(arg2, 2);
          assert.equal(arg3, 3);
          done();
        }
      });
      var f = new Foo();
    });

  });
  
});

