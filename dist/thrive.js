/*!
 * thrive - A base class that gives you event proxy, inheritance and object arguments
 * v0.0.2
 * https://github.com/jgallen23/thrive
 * copyright JGA 2012
 * MIT License
*/

//built with clientside 0.5.0 https://github.com/jgallen23/clientside
if (typeof __cs == 'undefined') {
  var __cs = { 
    map: {}, 
    libs: {},
    r: function(p) {
      var mod = __cs.libs[__cs.map[p]];
      if (!mod) {
        throw new Error(p + ' not found');
      }
      return mod;
    }
  };
  window.require = __cs.r;
}
__cs.map['aug'] = 'cs4d3a0efa';
__cs.map['currie'] = 'cs130b850d';

//aug.js
__cs.libs.cs4d3a0efa = (function(require, module, exports) {
var aug = function __aug() {
  var options, name, src, copy, clone, c,
      deep = false,
      args = Array.prototype.slice.call(arguments),
      target = args.shift(),
      i = 0;
  if (typeof target === 'boolean') {
    deep = true;
    target = args.shift();
  }
  for (c = args.length; i < c; i++) {
    if ((options = args[i]) === null)
      continue;
    for (name in options) {
      src = target[name];
      copy = options[name];
      if (target === copy)
        continue;
      if (deep && copy && typeof copy === 'object') {
        if (copy instanceof Array) {
          clone = src && src instanceof Array ? src : [];
        } else {
          clone = src && typeof src === 'object' ? src : {};
        }
        target[name] = aug(deep, clone, copy);
      } else {
        target[name] = copy;
      }
    }
  }
  return target;
};
if (typeof module !== 'undefined') module.exports = aug;
return module.exports || exports;
})(__cs.r, {}, {});

//currie.js
__cs.libs.cs130b850d = (function(require, module, exports) {
var currie = function(fn, scope) {
  var args = [];
  for (var i=2, len = arguments.length; i < len; ++i) {
    args.push(arguments[i]);
  }
  return function() {
    var fnArgs = args.slice(0);
    for (var i = 0, c = arguments.length; i < c; i++) {
      fnArgs.push(arguments[i]);
    }
    fn.apply(scope, fnArgs);
  };
};
if (typeof module !== 'undefined') {
  module.exports = currie;
}
return module.exports || exports;
})(__cs.r, {}, {});

//thrive.js
__cs.libs.csd0829335 = (function(require, module, exports) {
var aug = require('aug');
var currie = require('currie');
var init = false;
var Thrive = function() {};
Thrive.extend = function thriveExtend(obj, statics) {
  init = true;
  var proto = new this();
  init = false;
  aug(proto, obj);
  var Thrive = function() {
    if (!init) {
      this.Class = Thrive;
      this.construct.apply(this, arguments);
    }
  };
  Thrive.prototype = proto;
  Thrive.prototype.constructor = Thrive;
  var ext = this;
  if (this._root) {
    ext = { extend: this.extend, mixin: this.mixin };
  }
  aug(Thrive, ext, statics);
  if (Thrive.init) {
    Thrive.init();
  }
 
  return Thrive;
};
Thrive.prototype.construct = function(params) {
  aug(this, params);
  if (this.init) {
    this.init();
  }
};
Thrive.prototype.proxy = function(fn, arg1, arg2, arg3) {
  var args = [fn, this];
  for (var i = 1, c = arguments.length; i < c; i++) {
    args.push(arguments[i]);
  }
  return currie.apply(currie, args);
};
Thrive.mixin = function(obj) {
  aug(this.prototype, obj);
};
Thrive._root = true;
module.exports = Thrive;
return module.exports || exports;
})(__cs.r, {}, {});

window['Thrive'] = __cs.libs.csd0829335;
__cs.map['Thrive'] = 'csd0829335';

