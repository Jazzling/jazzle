  import {Transformers, TransformByLeft} from '../other/globals.js';

Transformers['ForOfStatement'] =
function(n, isVal) {
  var s = this.setScope(n['#scope']);
  this.accessJZ();
  this.cur.synth_defs_to(this.cur.synthBase);

  var t = null;
  n.right = this.tr(n.right, true);
  t = this.allocTemp();
  var l = n.left; 
  n.left = t;

  var lead = null;
  var tval = this.synth_TVal(t), isVar = false, simp = true;
  if (l.type === 'VariableDeclaration') {
    isVar = true;
    simp = l.declarations[0].id.type === 'Identifier'; 
    l.declarations[0].init = tval;
    lead = this.tr(l, false);
  }
  else
    lead = this.tr(this.synth_SynthAssig(l, tval, false), false);

  if (isVar)
    lead = this.synth_AssigList([this.synth_NameList(this.cur, true), lead]);

  n.body = this.tr(n.body, false);
  if (n.body.type === 'BlockStatement')
    n.body['#lead'] = lead;
  else
    n.body = this.synth_AssigList([lead, n.body]);

  this.releaseTemp(t);

  if (this.cur.hasTZCheckPoint)
    n = this.synth_AssigList([this.synth_TZCheckPoint(this.cur), n]);

  n.type = '#ForOfStatement';
//if (isVar && simp)
//  n = this.synth_AssigList([this.synth_NameList(this.cur, false), n]);

  this.setScope(s);

  return n;
};

Transformers['ForInStatement'] =
function(n, isVal) {
  var left = n.left;
  var simp = true;
  var s = this.setScope(n['#scope']);

  this.cur.synth_defs_to(this.cur.synthBase );
  var isVar = false;
  if (left.type === 'VariableDeclaration') {
    isVar = true;
    var elem = left.declarations[0];
    left = elem.init === null ? elem.id : { // TODO: ugh
      type: 'AssignmentPattern',
      right: elem.init,
      left: elem.id,
      end: elem.init.end,
      loc: { start: elem.id.loc.start, end: elem.init.loc.end },
      start: elem.id.start,
      '#c': {}
    };

    n.left = left;
    simp = left.type === 'Identifier';
  }

  var lead = null, t = left.type ;

  if (t === 'Identifier') // TODO: must also handle renamedGlobals
    TransformByLeft['Identifier'].call(this, n, false, isVar);
  else if (t === 'MemberExpression') {
    n.right = this.tr(n.right, true);
    n.left = this.trSAT(n.left);
  }
  else {
    n.right = this.tr(n.right, true);
    var t = this.allocTemp(); this.releaseTemp(t);
    var assig = this.synth_SynthAssig(n.left, t, isVar);
    lead = this.tr(assig, false );
    n.left = t;
  }

  if (isVar && !simp) {
    var a = [this.synth_NameList(this.cur, true)];
    if (lead) a. push(lead );
    lead = this.synth_AssigList(a);
  }

  n.body = this.tr(n.body,false);
  if (n.body.type === 'BlockStatement')
    n.body['#lead'] = lead;
  else if (lead)
    n.body = this.synth_AssigList([lead, n.body]);

  n.type = (isVar && simp) ? '#ForInStatementWithDeclarationHead' : 
    '#ForInStatementWithExHead';

  if (isVar && simp)
    n = this.synth_AssigList([this.synth_NameList(this.cur, false), n]);

  if (this.cur.hasTZCheckPoint)
    n = this.synth_AssigList([this.synth_TZCheckPoint(this.cur), n]);

  this.setScope(s);
  return n;
};

// TODO: a better way to emit init's that are vardecls with tz has to exist
Transformers['ForStatement'] =
function(n, isVal) {
  var s = this.setScope(n['#scope']), lead = null;
  var init = n.init, test = n.test, next = n.update;

  this.cur.synth_defs_to(this.cur.synthBase);

  if (init === null);
  else if (init.type === 'VariableDeclaration') {
    var cutInit = false;
    if (init.kind !== 'var')
      cutInit = true;
    else {
      var list = init.declarations, l = 0;
      while (l < list.length)
        if (list[l++].id.type !== 'Identifier') {
          cutInit = true;
          break;
        }
    }
    var tr = this.tr(init, false);
    if (cutInit) {
      n.init = null;
      lead = tr;
    }
    else { n.init = tr; }
  }
  else { n.init = this.tr(init, false); }

  if (test)
    n.test = this.tr(test, true);

  if (next)
    n.update = this.tr(next, true);

  n.body = this.tr(n.body, false);

  n.type = '#ForStatement';

  if (lead)
    n = this.synth_AssigList([lead, n]);

  if (this.cur.hasTZCheckPoint)
    n = this.synth_AssigList([this.synth_TZCheckPoint(this.cur), n]);

  this.setScope(s);

  return n;
};
