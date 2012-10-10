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
