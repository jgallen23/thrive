var aug = require('aug');
var currie = require('currie');
var Subs = require('subs');

var init = false;
var Thrive = function() {}
Thrive.extend = function thriveExtend(obj, statics) {

  init = true;
  var proto = new this();
  init = false;

  aug(proto, obj);

  var Thrive = function() {
    if (!init) {
      this.Class = Thrive;
      Subs.call(this);
      this.construct.apply(this, arguments);
    }
  }

  Thrive.prototype = proto;
  Thrive.prototype.constructor = Thrive;
  var ext = this;
  if (this._root) {
    var staticSafe = ['extend', 'mixin', 'on', 'once', 'off', 'emit', 'hasHandlers'];
    ext = {};
    for (var prop in this) {
      if (staticSafe.indexOf(prop) != -1) {
        ext[prop] = this[prop];
      }
    }
  }
  aug(Thrive, ext, statics);
  Subs.call(Thrive);
  if (Thrive.init) {
    Thrive.init();
  }
 
  return Thrive;

}

Thrive.prototype.construct = function(params) {
  aug(this, params);
  if (this.init) {
    this.init();
  }
}

Thrive.prototype.proxy = function(fn, arg1, arg2, arg3) {
  var args = [fn, this];
  for (var i = 1, c = arguments.length; i < c; i++) {
    args.push(arguments[i]);
  }
  return currie.apply(currie, args);
}

Thrive.mixin = function(obj) {
  aug(this.prototype, obj)
}
Thrive._root = true;

Subs(Thrive);
Subs(Thrive.prototype);

module.exports = Thrive;
