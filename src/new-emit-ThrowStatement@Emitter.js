Emitters['ThrowStatement'] =
function(n, flags, isStmt) {
  var r = {hasParen: false}, cb = CB(n);
  this.emc(cb, 'bef');

  this.sl(n.loc.start);
  this.w('throw').onw(wcb_afterRet, r);
  this.eA(n.argument, EC_NONE, false);
  if (r.hasParen) this.w(')');
  this.w(';').emc(cb, 'aft');
};
