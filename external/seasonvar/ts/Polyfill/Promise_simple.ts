export type Promise = {
  then(cb);
};

export function Promise_simple(f) {
  var returnCb = this.returnCb.bind(this);
  f(returnCb);
}
Promise_simple.prototype.then = function(cb) {
  this.cb = cb;
};
Promise_simple.prototype.cb = function() {};
Promise_simple.prototype.returnCb = function(q) {
  var self = this;
  setTimeout(function() {
    self.cb(q);
  }, 0);
};
