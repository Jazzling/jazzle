** THIS IS THE ACTIVE BRANCH UNTIL ~~THINGS ARE MIGRATED TO ROLLUP~~ THE BUNDLER GETS WORKING; ADAPTING CODE TO USE IMPORT/EXPORT STARTS AFTER GETTING THE SCRIPT-LEVEL EMITTER TO WORK **

# Basic Usage:
```js
// assuming you are in repo's root
var j = require('./dist/jazzle.js');
var src = 'var a, b, l ={a, [b]} = l';

// parse it
var syntaxNode = new j.Parser(src).parseProgram();

// transform what was parsed
var transformer = new j.Transformer();
var transformedNode = transformer.tr(syntaxNode, false);

// emit what was transformed
var emitter = new j.Emitter();
emitter.emitStmt(transformedNode);
emitter.flush(); // flush whatever output that is still pending

// the compiled code:
console.log(emitter.out);

// along with the produced sourcemap:
console.error(emitter.sm);
```

** N.A.F.O.S [^1] : this still work in progress; please check back in a month or so **
[^1]: notice for the aliens from the outer space
