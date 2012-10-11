var aug = require('aug');
var currie = require('currie');
var Subs = require('subs');

var init = false;
var Thrive = function() {}
Thrive.extend = function (obj, statics) {

  init = true;
  var proto = new this();
  init = false;

  aug(proto, obj);

  var Thrive = function() {
    this.Class = Thrive;
    Subs.call(this);
    this.construct.apply(this, arguments);
  }

  Thrive.prototype = proto;
  Thrive.prototype.constructor = Thrive;
  aug(Thrive, this, statics);
  Subs.call(this);
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

Subs(Thrive);
Subs(Thrive.prototype);

module.exports = Thrive;
