var assert = require('assert');

var Thrive = require('../');

suite('Thrive', function() {
  

  suite('#extend', function() {

    test('init is called', function() {
      var Cls = Thrive.extend({
        init: function() {
          this.initWasCalled = true;
        }
      });
      var ob = new Cls();

      assert.equal(ob.initWasCalled, true);
    });

    test('pass in params', function() {
      var Cls = Thrive.extend({});
      var ob = new Cls({ test: false, debug: true });

      assert.equal(ob.test, false);
      assert.equal(ob.debug, true);
      
    });

    test('instanceof', function() {

      var Cls = Thrive.extend({});

      var c = new Cls();
      assert.equal(c instanceof Cls, true);
      assert.equal(c instanceof Thrive, true);
    });

  });

  suite('inheritance', function() {

    test('basic inheritance', function() {

      var Foo = Thrive.extend({
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
      var Foo = Thrive.extend({
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
  
  suite('extending Thrive', function() {

    test('adding to prototype', function() {
      Thrive.prototype.testMe = function() {
        this.testMeWasCalled = true;
      };
      var Foo = Thrive.extend({});
      var foo = new Foo();
      foo.testMe();
      assert.equal(foo.testMeWasCalled, true);
      
    });
    
  });
  
  suite('#proxy', function() {
    test('maintain scope', function(done) {

      var Foo = Thrive.extend({
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

  suite('statics', function() {

    test('able to define statics on a class', function() {

      var Foo = Thrive.extend({
        //instance methods
        init: function() {

        },
        method: function() {
        }
      }, {
        //statics
        staticMethod: function() {
        }
      });

      var foo = new Foo();

      assert.equal(typeof Foo.staticMethod, 'function');
      assert.equal(foo.Class, Foo);
    });

    test('inheritance keeps statics', function() {
      
      var Foo = Thrive.extend({
        //instance methods
        init: function() {

        },
        method: function() {
        }
      }, {
        //statics
        staticMethod: function() {
        }
      });

      var Bar = Foo.extend({
      });

      var bar = new Bar();
      assert.equal(typeof Bar.staticMethod, 'function');
      assert.equal(bar.Class, Bar);
    });

    test('other classes don\'t have statics conflict', function() {

      var Foo = Thrive.extend({
      }, {
        staticMethod: function() {}
      });

      var Boo = Thrive.extend({
      }, {
        staticMethod2: function() {}
      });

      var foo = new Foo();
      var boo = new Boo();

      assert.equal(typeof Foo.staticMethod, 'function');
      assert.equal(typeof Foo.staticMethod2, 'undefined');
      assert.equal(typeof Boo.staticMethod, 'undefined');
      assert.equal(typeof Boo.staticMethod2, 'function');
      
    });

    test('if init function exists, call it', function() {

      var called = false;
      var Foo = Thrive.extend({
      }, {
        init: function() {
          called = true;
        }
      });

      assert.equal(called, true);
    });

    test('don\'t extend everything off of Thrive', function() {
      Thrive.View = {};

      var Foo = Thrive.extend({

      });

      assert.equal(typeof Foo.View, 'undefined');
      assert.equal(typeof Foo._root, 'undefined');
    });

  });

  suite('mixin', function() {

    test('add methods to prototype', function() {
      var mixin = {
        someMethod: function() {
          return true;
        }
      };
      var Foo = Thrive.extend({

      });

      var foo = new Foo();
      Foo.mixin(mixin);

      assert.equal(typeof foo.someMethod, 'function');
      assert.equal(foo.someMethod(), true);
      
    });
    
  });
  
  
});

