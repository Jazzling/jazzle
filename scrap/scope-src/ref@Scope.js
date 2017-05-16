this.refDirect_m = function(mname, anotherRef) {
  var ref = this.findRef_m(mname, true, anotherRef && anotherRef.synthTarget !== null);
  if (anotherRef === null) ref.direct++;
  else ref.absorbDirect(anotherRef);
};

this.refIndirect_m = function(mname, ref) {
  this.findRef_m(mname, true, ref.synthTarget !== null).absorbIndirect(ref);
};

this.findRef_m = function(mname, createIfNone, isLiquid) {
  var target = isLiquid ? this.liquidRefs : this.refs;
  return (
    target.has(mname) ? 
    target.get(mname) :
    createIfNone ?
      target.set(mname, new Ref(this)) :
      null
  );
  
};

this.hasUnresolvedRef_m = function(mname) {
  return this.findRef_m(mname) && !this.findDecl_m(mname);
};