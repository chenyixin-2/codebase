lg(GetScriptName());
// A closure is a function that remembers its outer variables and can access them
// closure is "remember the state"
function init() {
    var name = "Mozilla";
    function displayName() {
        lg(name);
    }
    displayName();
}
init();

// closure 1
function makeFunc() {
    let name = "Mozzila";
    function displayName() {
        lg(name);
    }

    return displayName;
}

// closure 2
let myFunc = makeFunc();
myFunc();

// closure 3, state variable
function makeAdder(x) {
    return function (y) {
        return x + y;
    };
}
let add5 = makeAdder(5);
let add10 = makeAdder(10);
lg(add5(5));
lg(add10(10));

// practical
function makeSizer(size) {
    return function () {
        document.body.style.fontSize = size + 'px';
    };
}
let size12 = makeSizer(12);

// call closure in click event
// document.getElementById('size-12').onclick = size12;  // event 
// <a href="#" id="size-12">12</a> // ui element 

// private function by closure
let counter = (function () {
    let privateCounter = 0;
    function changeBy(val) {    // <-------------------------- changeBy() is the value outside can never change
        privateCounter += val;
    }
    return {
        increment: function () {
            changeBy(1);
        },
        decrement: function () {
            changeBy(-1);
        },
        value: function () {
            return privateCounter;
        }
    }
})();

lg(counter.value());
lg('type of counuter : ' + typeof counter);
counter.increment();
counter.increment();
lg('type of counuter.increment : ' + typeof counter.increment);
lg(counter.value());
lg(counter.decrement());
lg(counter.value());

// a more comprehensible way of thinking
// Benefit : 2 independent closures
// let a = (xxx)() => create & call a function
let makeCounter = function () {
    let privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function () {
            changeBy(1);
        },
        decrement: function () {
            changeBy(-1);
        },
        value: function () {
            return privateCounter;
        }
    }
};

let Counter1 = makeCounter();
let Counter2 = makeCounter();

lg(Counter1.value());
Counter1.increment();
Counter2.increment();
lg(Counter1.value());
Counter1.decrement();
lg(Counter1.value());
lg(Counter2.value());

// Common error for closure
// function showHelp(help){
//     document.getElementById('help').innerHTML = help;
// }

// function setupHelp(){
//     let helpText = [
//         {'id': 'email', 'help': 'Your e-mail address'},
//         {'id': 'name', 'help': 'Your full name'},
//         {'id': 'age', 'help': 'Your age (you must be over 16)'}
//     ];

//     for(var i = 0; i < helpText.length; i++){
//         let item = helpText[i];
//         document.getElementById(item.id).onfocus = function() {
//             showHelp(imte.help);
//         }
//     }
// }

// setupHelp();

// function showHelp(help) {
//     document.getElementById('help').innerHTML = help;
// }

// function makeHelpCallback(help) {
//     return function() {
//         showHelp(help);
//     };
// }

// function setupHelp() {
//     var helpText = [
//         {'id': 'email', 'help': 'Your e-mail address'},
//         {'id': 'name', 'help': 'Your full name'},
//         {'id': 'age', 'help': 'Your age (you must be over 16)'}
//         ];

//     for (var i = 0; i < helpText.length; i++) {
//         var item = helpText[i];
//         lg(document.getElementById(item.id)); /// can't set property of "null"
//         document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
//     }
// }

// setupHelp();

// use "let" instead of ""
// let : block variable

function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
    this.getName = function () {
        return this.name;
    };

    this.getMessage = function () {
        return this.message;
    };
}

function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
// *NOT* suggest
MyObject.prototype = {
    getName: function () {
        return this.name;
    },
    getMessage: function () {
        return this.message;
    }
}

// suggest
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
MyObject.prototype.getName = function () {
    return this.name;
};
MyObject.prototype.getMessage = function () {
    return this.message;
};

//////////////////////////////////////////////////////////////////
// sum
//////////////////////////////////////////////////////////////////
function sum_closure(a) {
    return function (b) {
        return a + b;
    }
}
lg('sum()() : ' + sum_closure(1)(2));

try {
    lg('sum()() : ' + sum_closure(1)(2)(3));
} catch (e) {
    lg(e);
    // Uncaught TypeError: sum_closure(...)(...) is not a function
    // at closure.js:208
}

function sum_closure_multiple(a) {
    let currentSum = a;

    function f(b) {
        currentSum += b;
        return f;
    }

    f.toString = function () {  // <----------------------- primitive conversion
        return currentSum;
    }

    return f; //<-----------------------------> return function(){};
}
lg(sum_closure_multiple(1)(2));
lg(sum_closure_multiple(1)(-5)(-2));
lg(sum_closure_multiple(0)(1)(2)(3)(4)(5));

// function object
let arr_filter_closure = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function inBetween(min, max) {
    return function (test) {
        if (test >= min && test <= max) return true;
        else return false;
    };
};

function inArray(arrayObj) {
    if (arrayObj === null || !Array.isArray(arrayObj)) return function (test) { return false };
    return function (test) { return arrayObj.includes(test); }
}
lg('array filter ' + arr_filter_closure.filter(inBetween(3, 6)));
lg('array filter ' + arr_filter_closure.filter(inArray([1, 2, 10])));

// sort by field
let users_sort_field = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(field) {
    return function (a, b) {
        if (!field in a || !field in b) {
            lg("Field not exists");
            return -1;
        }
        lg("a[field] > b[field] : " + (a[field] > b[field]));
        return a[field] > b[field] ? 1 : -1;
    };
}

users_sort_field.sort(byField('name'));
users_sort_field.forEach(user => lg(user.name));

users_sort_field.sort(byField('age'));
users_sort_field.forEach(user => lg(user.age));

users_sort_field.sort(byField('surname'));
users_sort_field.forEach(user => lg(user.surname));