Transformer['VariableDeclrataion'] =
function(n, isVal) {
  ASSERT_EQ.call(this, isVal, false);
  var list = n.declarations, kind = n.kind, l = 0, tr = null;
  var s = [];
  while (l < list.length) {
    tr = this.transformDtor(list[l++], kind );
    tr && s.push(tr);
  }
  return this.synth_AssigList(s);
};

this.transformDtor =
function(n, kind) {
  var assig = null, left = n.id, right = n.init;
  if (right === null) {
    if (kind === 'var')
      return null;
    right = this.synth_Void0();
  }

  assig = this.synth_SynthAssig(left, right, true);
  return this.tr(assig, false);
};
