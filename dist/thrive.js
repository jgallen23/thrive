if (typeof __cs == 'undefined') {
  var __cs = { 
    map: {}, 
    libs: {},
    r: function(p) {
      var mod = __cs.libs[__cs.map[p]];
      if (!mod) {
        throw new Error(mod + ' not found');
      }
      return mod;
    }
  };
}
__cs.map['aug'] = 'cs562956'
__cs.map['currie'] = 'cs691906'

//aug.js
__cs.libs.cs562956 = (function(require, module, exports) {
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
__cs.libs.cs691906 = (function(require, module, exports) {
var currie = function(fn, scope) {
  var args = [];
  for (var i=2, len = arguments.length; i < len; ++i) {
    args.push(arguments[i]);
  };
  return function() {
    for (var i = 0, c = arguments.length; i < c; i++) {
      args.push(arguments[i]);
    }
    fn.apply(scope, args);
  };
}
module.exports = currie;
return module.exports || exports;
})(__cs.r, {}, {});

//thrive.js
var Thrive = __cs.libs.main = (function(require, module, exports) {
var aug = require('aug');
var currie = require('currie');
var init = false;
var Thrive = function() {}
Thrive.extend = function extend(obj, statics) {
  init = true;
  var proto = new this();
  init = false;
  aug(proto, obj);
  var Thrive = function(params) {
    aug(this, params);
    this.Class = Thrive;
    if (!init && this.init) {
      this.init();
    }
  }
  Thrive.prototype = proto;
  Thrive.prototype.constructor = Thrive;
  aug(Thrive, this, statics);
 
  return Thrive;
}
Thrive.prototype.proxy = function(fn, arg1, arg2, arg3) {
  var args = [fn, this];
  for (var i = 1, c = arguments.length; i < c; i++) {
    args.push(arguments[i]);
  }
  return currie.apply(currie, args);
}
module.exports = Thrive;
return module.exports || exports;
})(__cs.r, {}, {});


