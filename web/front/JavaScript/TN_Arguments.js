lg(GetScriptName());

// spread syntax : ...
// ... allows to pass "iteralbe" args as "list" to call
// The apply accepts only "array-like" args.

function cachingDecorator(func) {
    let cache = new Map();
    return function (...x) {
        if (cache.has(...x)) {
            lg("cached");
            return cache.get(...x);
        }

        lg("new call");
        lg(this);
        let result = func.call(this, ...x); // <----------------------------- "apply" "this" --> worker
        // "this" is bind to worke @ function creation time
        cache.set(...x, result);

        return result;
    };
}

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