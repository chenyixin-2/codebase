lg(GetScriptName());

// function are "value"s, and more precisely, "objects"
lg(typeof sayHi_functions); // declaration raising
lg(typeof sayHi_functions()); // undefined

// 'name' property
function sayHi_functions() {
    lg("Hi");
}
lg(sayHi_functions.name);

function f(sayHi = function () { }) {
    lg(sayHi.name);
}
f();

// 'length' property
function f1(a) { }
function f2(a, b) { }
function many(a, b, c, ...more) { }

lg(f1.length);
lg(f2.length);
lg(many.length);

function ask(question, ...handlers) {
    let isYes = confirm(question);

    for (let handler of handlers) {
        if (handler.length == 0) // 0 parameter       <----------------- determine the parameter
        {
            if (isYes) handler()
        } else {
            handler(isYes);
        }
    }
}
ask("Questions ?", () => lg("You said yes"), result => lg(result));

// nested function expression
// 1. recursion
// 2. when function variable changed, never changed
let sayHi = function func(who) {
    if (who) {
        lg(`Hello, ${who}`);
    } else {
        func(who);
    }
}

function sum_closure(a) {
    let currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function () {  // <----------------------- primitive conversion
        return currentSum;
    }

    return f;
}
lg(sum_closure(1)(2));
lg(sum_closure(1)(-5)(-2));
lg(sum_closure(0)(1)(2)(3)(4)(5));

// counter
function makeCounter_func() {
    function counter() {
        return counter.count++;
    };

    counter.count = 0;

    counter.set = value => counter.count = value;

    counter.decrease = () => counter.count--;

    return counter;
}

let counter_func = makeCounter_func();
lg('counter in function ' + counter_func());
lg('counter in function ' + counter_func());

counter_func.set(10);
counter_func.decrease();
lg(counter_func());
lg(counter_func.count); // acutally it's 10

//////////////////////////////////////////////////////////////////
// "NEW" function
//////////////////////////////////////////////////////////////////
function getFunc_error() {
    let value = "test";
    let func = new Function('lg(value)');    // <----------------------------- reference local variable
    return func;
}

try {
    getFunc_error()(); //     
} catch (error) {
    lg(error);
}

function getFunc_ok() {
    let value = "new function refer local value test";
    let func = function () { lg(value); }    // <----------------------------- reference local variable
    return func;
}

try {
    getFunc_ok()(); //
} catch (error) {
    lg(error);
}

new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces