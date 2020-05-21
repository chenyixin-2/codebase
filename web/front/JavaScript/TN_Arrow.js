lg(GetScriptName());

// arrow had no "this"

// arrow had no "arguments"
function defer(f, ms) {
    return function () {
        setTimeout(() => f.apply(this, arguments), ms) // arguments -> outside arguments -> function () arguments
    };
};

function sayHi_arrow(who) {
    lg('Hello, ' + who);
};

let sayHiDeferred = defer(sayHi_arrow, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds

