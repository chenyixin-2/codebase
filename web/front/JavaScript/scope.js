lg(GetScriptName());
// global level

// Explicit
/*<script type="text/javascript">
var testValue = 123;
var testFunc = function () { console.log('just test') };
console.log(window.testFunc)		// ƒ () { console.log('just test') }
console.log(window.testValue)		// 123
</script>*/

// Implicit
/*
<script type="text/javascript">

function foo(value) {

  result = value + 1;	 // 没有用 var 修饰

  return result;
};

foo(123);				// 124

console.log(window.result);			// 124 <=  挂在了 window全局对象上 

</script>
*/

// Lexical Environment

// function level
// block level
// word level
// dynamic this reference

globalExplicitObject_delcare_before_use = "global Explicit Object delcare *before* use";
lg(globalExplicitObject_delcare_before_use);

try {
    lg(globalExplicitObject_delcare_after_use);
    globalExplicitObject_delcare_after_use = "global Explicit Object delcare *after* use";
} catch (e) {
    lg(e);
}

try {
    lg(globalExplicitObject_delcare_after_use_var);
    var globalExplicitObject_delcare_after_use_var = "global Explicit Object delcare *after* use";
} catch (e) {
    lg(e);
}

//////////////////////////////////////////////////////////////////
// code block
// {}, closure (nested function)
//////////////////////////////////////////////////////////////////
try {
    {
        let message_block = "Hello";
        lg(message_block);
    }
    lg(message_block);
} catch (e) {
    lg(e);
}
// good
{
    let message_block = "Hello";
}
{
    let message_block = "Yes";
}
// error
try {
    let message_block = "1";
    // let message_block = "2";  // Syntax Error
} catch (e) {
    lg(e);
}

// good : for
try {
    for (let i = 0; i < 3; i++) {
        lg(i);
    }
    lg(i);    // <--------------------- Reference Error 
} catch (e) {
    lg(e);
}

// nested funciton (closure)
function af() {
    let b = function () { lg("hi") };
    return b;
}

// Lexical Environment
// every running function, code block{}, and the script as a whole an internal(hidden) *associated object* know as "Lexical Environment"
// Lexical Environment : 2 parts
// 1. Environmet Record <--> special internal object 
// 2. A Reference to "outer" lexical environment
// -----> LexicalEnvironmet.EnviromentRecord
// -----> LexicalEnvironmet.OuterEnvironmentRecord
// -----> xxx . [[Environment]]

// global
let phrase2 = "hello";
lg(phrase2);

//////////////////////////////////////////////////////////////////
// Function Declarations
//////////////////////////////////////////////////////////////////

// Function is different
SayHi();

function SayHi() {  // ready to use immediately when LexicalEnvironment is *INITIALIZED*
    lg("Say Hi");
}

try {
    SayHi_FuncObj(); // error : ReferenceError: Cannot access 'SayHi_FuncObj' before initialization

    let SayHi_FuncObj = function () {
        lg("Say Hi func object")
    }

} catch (e) {
    lg(e);
}

try {
    let SayHi_FuncObj = function () {
        lg("Say Hi func object")
    }

    SayHi_FuncObj(); // ok : <---------------------- here

} catch (e) {
    lg(e);
}

//////////////////////////////////////////////////////////////////
// Inner and outer Lexical Environment
//////////////////////////////////////////////////////////////////
let phrase3 = "hello";
function say(name) {
    lg(`${phrase3}, ${name}`);
}
phrase3 = "Ohhhhhhh!"; // <---------------- always the latest value
say("John");

{
    let phrase3 = "hello";
    {
        let phrase4 = "hellooooo";
        function say(name) {
            let phrase3 = "HELLO";  // <-------------- inner replace the outer
            lg(`${phrase3}, ${phrase4} ${name}`);
        }
        say("tony");
    }
}

//////////////////////////////////////////////////////////////////
// garbage collections
//////////////////////////////////////////////////////////////////
function f() {
    let value = 123;

    return function () {
        lg(value);
    }
}

let g = f(); // while g function exists, the value stays in memory

g = null; // ...and now the memory is cleaned up

//////////////////////////////////////////////////////////////////
// old "var" : no "Block Scope"
//////////////////////////////////////////////////////////////////
if (true) {
    var globalSeenByVar = "global seen by var";
}
lg(globalSeenByVar);

for (var globalIndexByVar = 2; globalSeenByVar < 10; globalSeenByVar++) {
    // do something
    debugger
    lg("do it");
}
lg(globalIndexByVar); // 0, the init value

// function level seen by var
try {
    function SayHi() {
        if (true) {
            var functionLevelSeenByVar = 10;
        }
        lg(functionLevelSeenByVar);
        functionLevelSeenByVar++;
    }
    lg(functionLevelSeenByVar);     // Reference Error
} catch (e) {
    lg(e);
}

// IIFE : immediately-invoked function expressions
// old days

// ok
(function () {  // <------------------------------------- function around 
    var message = "hello, IIFE";
    lg(message);
})();   // <------------------------------------- called immediately

// error
// function() {
//     var message = "hello, IIFE, wrong";
//     lg(message);
// }();

// ways to create IIFE
// Ways to create IIFE
(function () {
    lg("Parentheses around the function");
})();

(function () {
    lg("Parentheses around the whole thing");
}());

!function () {
    lg("Bitwise NOT operator starts the expression");
}();

+function () {
    lg("Unary plus starts the expression");
}();

// global object
var global_Var = 5;
lg(global_Var);
lg(window.global_Var);

try {
    lg("Get Script Name " + global.GetScriptName);
} catch (e) {
    lg(e);                                     // <-------------------- global is not defined
}