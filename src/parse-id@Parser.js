this.id = function() {
  var id = {
    type: 'Identifier',
    name: this.ltval,
    start: this.c0,
    end: this.c,
    loc: {
      start: this.loc0(),
      end: this.loc() },
    raw: this.ltraw, '#c': {}
  };
  this.spc(id, 'bef');
  this.next() ;
  return id;
};