var aug = require('aug');
var currie = require('currie');

var init = false;
var Obbie = function() {}
Obbie.extend = function extend(obj) {

  init = true;
  var proto = new this();
  init = false;

  aug(proto, obj);

  var Obbie = function(params) {
    aug(this, params);
    if (!init && this.init) {
      this.init();
    }
  }

  Obbie.prototype = proto;
  Obbie.prototype.constructor = Obbie;
  Obbie.extend = extend
 
  return Obbie;

}

Obbie.prototype.proxy = function(fn, arg1, arg2, arg3) {
  return currie(fn, this, arg1, arg2, arg3);
}

module.exports = Obbie;
