  import Scope from '../Scope/cls.js';
  import SortedObj from '../SortedObj/cls.js';

function ConcreteScope(parent, type) {
  Scope.call(this, parent, type);

  this.liquidDefs = new SortedObj();
  this.synthNamesUntilNow = null;

  this.spThis = null;
  this.isBooted = false;

  this.renamer = null;
}

 export default ConcreteScope;

 import {createObj} from '../other/util.js';
 export var cls = ConcreteScope.prototype = createObj(Scope.prototype);
