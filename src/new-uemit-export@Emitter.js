/*  TODO: raw, for alternative bundlers */Emitters['#ExportDefaultDeclaration'] =
function(n, isVal) {
  var b = n['#binding'];
  var elem = n.declaration;
  if (b !== null) { // if it has to have a binding, then it's either an expression or a nameless fn or cls
    this.wt('var',ETK_ID).bs();
    this.w(b.synthName).os().w('=').os();
    this.eN(elem, EC_NONE, false).w(';');
  }
  else 
    this.eA(elem, EC_START_STMT, true);
};

/*  TODO: raw, for alternative bundlers */Emitters['#ImportDeclaration'] =
function(n, isVal) {};
