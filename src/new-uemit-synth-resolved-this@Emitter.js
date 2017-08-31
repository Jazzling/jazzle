UntransformedEmitters['resolved-this'] =
function(n, flags, isStmt) {
  var hasParen = false, b = CB(n.id);
  var th = n.plain ? 'this' : n.target.synthName;

  if (n.chk) hasParen = flags & EC_EXPR_HEAD;
  if (hasParen) { this.w('('); flags = EC_NONE; }

  if (n.chk) { 
    this.w(n.target.ref.scope.scs.getLG('ti').getL(0).synthName)
      .w('||').jz('tz').w('(').writeString('this',"'");
    this.wm(')',',');
  }
  this.emc(b, 'bef');
  this.wt(th, ETK_ID);
  this.emc(b, 'aft');

  hasParen && this.w(')'); 

  isStmt && this.w(';');
};
