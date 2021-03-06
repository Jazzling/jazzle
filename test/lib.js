function TestSuite() {
  this.name = "";
  this.tester = { run: null, make: null };
  this.listener = null;
  this.extra = {};
  this.comp = { fail: null, pass: null };
  this.tests = [];
  this.ignorerNameList = [];
  this.ignorerMap = {};
}

function TestAttrs() {
  this.type = "";
  this.value = null;
}

var HAS = {}.hasOwnProperty;

var tesu = TestSuite.prototype;

function _m(name) { return name+'%'; }

function ASSERT(cond, message) {
  if (cond) return;
  throw new Error(message);
}

tesu.add =
function(test, retain) {
  if (retain)
    this.tests.push(test);
  else
    this.runOne(test);
  return this;
};

tesu.addIgnorer =
function(name, ignorer) {
  var mname = _m(name);
  var list = null;
  if (!HAS.call(this.ignorerMap, mname)) {
    this.ignorerNameList.push(name);
    this.ignorerMap[mname] = list = [];
  }
  else
    list = this.ignorerMap[mname];

  list.push(ignorer);
  return this;
};

tesu.set =
function(name, content) {
  return this.extra[_m(name)] = content;
};

tesu.get =
function(name) {
  return this.has(name) ? this.extra[_m(name)] : void 0;
};

tesu.complete =
function(test, actualRes, actualType) {
  test.completeVT(actualRes, actualType);
  var compRes = null;
  try {
    compRes = this.comp[actualType].call(this, test.expected.value, test.actual.value);
    test.compRes(compRes, 'complete');
  } catch (err) {
    test.compRes(err, 'abort');
  }
  this.listener && this.listener.notify('complete', test);
  return this;
};

tesu.has =
function(name) {
  return HAS.call(this.extra, _m(name));
};

tesu.abort =
function(test, actualRes, actualType) {
  test.abortVT(actualRes, actualType);
  this.listener && this.listener.notify('abort', test);
  return this;
};

tesu.ignore =
function(test, ignorer) {
  test.ignore(ignorer);
  this.listener && this.listener.notify('ignore', test);
};    

tesu.getIgnorer =
function(test) {
  var li = -1, ni = -1;

  ni = 0;
  while (ni < this.ignorerNameList.length) {
    var n = this.ignorerNameList[ni];
    li = 0;
    var l = this.ignorerMap[_m(n)];
    while (li<l.length) {
      var c = l[li];
      if (c(test))
        return { i: li, name: n };
      ++li;
    }
    ++ni;
  }

  return null;
};

tesu.runOne =
function(test) {
  var ignorer = null;
  try {
    ignorer = this.getIgnorer(test);
  } catch (err) {
    return this.abort(test, err, 'ignorer-test');
  }
    
  if (ignorer) {
    return this.ignore(test, ignorer);
  }

  var tester = null;
  try {
    tester = this.tester.make.call(this, test);
  } catch (err) {
    return this.abort(test, err, 'tester-create');
  }

  var testRes = null;
  var ttype = "";
  try {
    testRes = this.tester.run.call(this, tester, test);
    ttype = 'pass';
  } catch (err) {
    ttype = 'fail';
    testRes = err;
  }
  return this.complete(test, testRes, ttype);
};

tesu.runAll =
function() {
  var list = this.tests, e = 0;
  while (e<list.length)
    this.runOne(list[e++]);

  this.listener && this.listener.notify('finish', null);
};

function Test() {
  this.state = "";
  this.expected = new TestAttrs();
  this.actual = new TestAttrs();
  this.extra = {};
  this.comp = { value: void 0, compatible: false, state: "" };
  this.name = "";
}

var t = Test.prototype;

t.get =
function(name) {
  return this.has(name) ? this.extra[_m(name)] : null;
};

t.set =
function(name, content) {
  return this.extra[_m(name)] = content;
};

t.has =
function(name) {
  return HAS.call(this.extra, _m(name));
};

t.expectVT =
function(v,t) {
  this.expected.value = v;
  this.expected.type = t;
};

t.abortVT =
function(v,t) {
  this.state = 'abort';
  this.actual.value = v;
  this.actual.type = t;
};

t.completeVT =
function(v,t) {
  this.state = 'complete';
  this.actual.value = v;
  this.actual.type = t;
};

t.completed =
function() {
  return this.state === 'complete';
};

t.ignore =
function(ignorer) {
  this.state = 'ignore';
  this.actual.value = ignorer;
  this.actual.type = 'ignore';
};

t.ignored =
function() {
  return this.state === 'ignore';
};

t.compRes =
function(comp,state) {
  this.comp.value = state === 'abort' ? comp : comp.value;
  this.comp.compatible = state === 'abort' ? false : comp.compatible;
  this.comp.state = state;
};

// TEST STATES:
// these are the various states a test might end up in when it is run:
// aborted: the test could not complete -- an error unrelated to the test itself happened amid the way
// ignored: the test was ignored
// completed: the test reached its end, either contrary to or the same as what was expected
//   contrary: the test completed, but `expected.state != `actual.state
//   incompatible: the test completed, and `expected.state == `actual.state, but `expected.value isn't matching `actual.value
//   compatible: the test completed -- `expected.state == `actual.state and `expected.value mathes `actual.value

t.
contrary =
function() {
  return this.completed() &&
    this.actual.type !== this.expected.type;
};

t.
incompatible =
function() {
  if (!this.completed() || this.contrary())
    return false;
  ASSERT.call(this, this.comp, 'missing comp');
  return !this.comp.compatible;
};

t.
asExpected =
function() {
  return this.completed() && !this.contrary() && !this.incompatible();
};

t.
aborted =
function() {
  return this.state === 'abort';
};

t.
geci =
function() {
  var geci = "";
  if (this.ignored()) geci += 'g';
  if (this.asExpected()) geci += 'e';
  if (this.contrary()) geci += 'c';
  if (this.incompatible()) geci += 'i';
  if (geci.length !== 1) {
    console.error(this);   
    ASSERT.call(this, false, 'unknown geci');
  }

  return geci;
};

  module.exports.TestSuite = TestSuite;
  module.exports.Test = Test;
