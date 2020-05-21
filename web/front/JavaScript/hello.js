lg(GetScriptName());
lg("yes");

/*lg("hello");*/
[1,2].forEach(lg);

(function() {
    'use strict';
    // ... your code ...
})

let message;
message = "a";

const birthday = '1234';
console.log(birthday);

let infinity = Infinity; // computational right, but value is Infinity
let nan = "not a number" / 2;  // computational error

console.log(infinity);
console.log(nan);

// BigInt
const BigInt = 123456789012345678901234n;
console.log(BigInt);

// String
let str = "Hello";
let str2 = 'Single quote';
let phrase = `can embed another ${str}`;
let fakePhrase = `hello ${"name"}`;
console.log(phrase);
console.log(fakePhrase);

// Null : nothing, empty, value known
// non referencing object
// for "assign"
let nul = null;
// "In JavaScript, null is not a “reference to a non-existing object” or a “null pointer” like in some other languages"
console.log(nul);

// Undefined : value not assigned
// for "check" like if (und)
let und = undefined;
console.log(und);


// Object : non-primitive type

// Symbol : unique identifiers for objects

console.log(typeof undefined);
console.log(typeof 0);
console.log(typeof 10n); //bigint
console.log(typeof Symbol("id")); // symbol

console.log(typeof Math); //"object"
console.log(typeof null); // "object"
console.log(typeof lg); // "function"

// don't use 'typeof null' => typeof null = object is legacy bug => typeof 

//////////////////////////////////////////////////////////////////////////
// Type Conversion
//////////////////////////////////////////////////////////////////////////
let bValue = true;
console.log(typeof bValue); // boolean
lg(String(bValue));
lg(String(undefined)); // NaN
lg(String(null)); // 0 

lg("6"/"2"); // stirng -> number

lg("+++++++++++++ Number conversion +++++++++++++");

lg(Number("123")); // string -> number
lg(Number("an arbiritary string instead of a number")); // NaN

lg(Number(undefined)); // NaN
lg(Number(null)); // 0
lg(Number(true)); // 1
lg(Number(false)); // 0
lg(Number("string")); //
lg(Number(" ")); //
lg(Number(" string ")); //
lg(Number("123z")); //

lg("+++++++++++++ Boolean conversion +++++++++++++");
lg(Boolean(0));
lg(Boolean(1));
lg(Boolean("hello"));
lg(Boolean(""));

lg(Boolean("0")); // literal "0" -> true
lg(Boolean(" ")); // space -> true


lg("+++++++++++++ callbacks +++++++++++++");
// functions as values and using function expressions
function ask(q, y, n)
{
    function confirm(q)
    {
        if (String(q).length>10) return true;
        else return false;
    }
    if (confirm(q)) y();
    else n();
}

ask("Love you", function(){ lg("yes");}, function(){ lg("no");});
ask("I Love programming", function(){ lg("yes");}, function(){ lg("no");});

// function declarartion
function funcDeclaration(){
    // code
}
let funcExpression = function(){
    // expression
}

// forward declaration for forward-reference
sayFuncDeclaration("hi");
function sayFuncDeclaration(word){
    lg(word);
}

let age = 18;
if (age < 18 ){
    function welcome(){
        lg("youth");
    }
} else {
    function welcome(){
        lg("adult");
    }
}
// welcome(); // failed for strict mode, ReferenceError: welcome is not defined

let welcome2;
if (age < 18 ){
    welcome2 = function(){
        lg("youth");
    }
} else {
    welcome2 = function(){
        lg("adult");
    }
}

welcome2()

lg("++++++++++ lambad ++++++++++");

// lambda
let sum = (a, b) => a + b;
lg(sum(1,2));

let double = n => n * 2;
lg(double(3));

ask(
    "Short lambada version?",
    () => lg("Short lambda."),
    () => lg("Long lambda.")
);

// debug test
function hello()
{
    lg("hello");
    debugger;
}