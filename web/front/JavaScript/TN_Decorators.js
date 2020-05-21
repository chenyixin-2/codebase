lg(GetScriptName());

//////////////////////////////////////////////////////////////////
// 
//////////////////////////////////////////////////////////////////
function slow(x) {
    lg(`called with ${x}`);
    return x;
}

function fuck(x, y) {
    lg(`${x} fuck ${y}`);
    return x + y;
}

//  decorator: a special function that takes another function and alters its behavior.
function cachingDecorator(func) {
    let cache = new Map();

    return function f(...x) {
        // lg(f.name); // f.name -> f
        // lg(this.name); // this.name -> ""

        lg("Type of arguments :" + typeof x);
        if (cache.has(...x)) {
            lg("from cache");
            return cache.get(...x);
        }

        lg("new calculations");
        let result = func(...x); // otherwise call func

        cache.set(...x, result);
        return result;
    }
}

slow = cachingDecorator(slow);
fuck = cachingDecorator(fuck);

lg(slow(1));
lg(slow(2));

lg(slow(1));
lg(slow(2));

lg(fuck(1, 2));
lg(fuck(1, 2));

//////////////////////////////////////////////////////////////////
// function.call for the context
// function.call (context[this], arg1, arg2, arg3)
//////////////////////////////////////////////////////////////////
let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        lg("Called with :" + x);
        return x * this.someMethod();
    }
}

function cachingDecorator(func) {
    let cache = new Map();
    return function (...x) {
        if (cache.has(...x)) {
            lg("cached");
            return cache.get(...x);
        }

        lg("new call");
        lg(this);
        let result = func.call(this, ...x); // "this" --> worker
        // "this" is bind to worke @ function creation time
        cache.set(...x, result);

        return result;
    };
}

worker.slow = cachingDecorator(worker.slow);
lg(worker.slow(2));
lg(worker.slow(2));

//////////////////////////////////////////////////////////////////
// 
//////////////////////////////////////////////////////////////////
let worker_apply = {
    slow(min, max) {
        lg(`Called with ${min} ${max}`);
        return min + max;
    }
}

worker_apply.slow = cachingDecorator(worker_apply.slow);

function cachingDecorator_apply(func, hash) {
    let cache = new Map();

    return function () {
        let key = hash(arguments);
        if (cache.has(key)) {
            return cache.get(key);
        }
        // let result = func.call(this, ...arguments);
        let result = func.apply(this, arguments);  // <----------------------------- same like using "call"

        cache.set(key, result);
        return result;
    }
}

function hash(args) {
    return args[0] + ',' + args[1];
}

function hash2(args){
    return args.join(); // <----------------------------- no such function
    return arguments.join(); // <----------------------------- no such function
}

function hash3(args){
    return [].join.call(arguments);                 // OK : <----------------------------- method borrowing
}
// So, technically it takes this and joins this[0], this[1] …etc together. It’s intentionally written in a way that allows any array-like this (not a coincidence, many methods follow this practice). That’s why it also works with this=arguments.

worker.slow = cachingDecorator_apply(worker.slow, hash);
// lg(worker.slow(3, 5)); // works
// lg(work.slow(3, 5)); // same(cached)


