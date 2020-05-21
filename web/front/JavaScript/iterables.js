lg(GetScriptName());

// what's iterable ?
// range 
// string

let range = {
    from: 1,
    to: 5
};

range[Symbol.iterator] = function () {
    // ...it returns the iterator object:
    // 2. Onward, for..of works only with this iterator, asking it for next values
    return {
        current: this.from,
        last: this.to,

        // 3. next() is called on each iteration by the for..of loop
        next() {
            // 4. it should return the value as an object {done:.., value:..}
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };  // we can change this.current for customized value
            } else {
                return { done: true }
            }
        }
    };
}

// now it works !
for (let num of range) {
    lg(num);
}

// setting the range attricutes directly when it's build
let range2 = {
    from: 1,
    to: 5,  // to -> Infinity

    [Symbol.iterator]() {    // <-------------------------------------------- interesting method
        // range[Symbol.iterator]() returns the range object itself
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ }
        } else {
            return { done: true };
        }
    }
}

// calling an iterator *explicitly*
let str_iterator = "Hello";
let iterator = str_iterator[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if (result.done) break;
    lg(result.value);
}

// array like : index, element, length
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};
let arr_like_from = Array.from(arrayLike); // (*)
lg(arr_like_from);
lg(arr_like_from.pop());

// array like : length not compatible
let arrayLike_length = {
    0: "Hello",
    1: "World",
    length: 3                   // <-------------------------- 3rd element : undefined
};
let arr_like_from_length = Array.from(arrayLike_length); // (*)
lg(arr_like_from_length);

// array like + mapping
let arr_like_from_map = Array.from(range, num => num * num);
lg(arr_like_from_map);

// 
let emoji = '𝒳😂';
let chars = Array.from(emoji);
lg(chars[0]);
lg(chars[1]);

//////////////////////////////////////////////////////////////////
// iterable for arguments
//////////////////////////////////////////////////////////////////
// array-like arguments
function printArrayLikeArguments(...args) {
    lg(typeof arguments); // <----------------------------- objects : arguments
    for (let i = 0; i < arguments.length; i++) {
        lg(arguments[i]);
    }
}
printArrayLikeArguments(1, 2, 'z', 's');

function printArrayLikeArguments2(...args) {
    // let h = arguments.join(",");  <----------------------------- failed : arguments.join *NOT* a function
    let h = args.join(';'); // <----------------------------- objects : args
    lg(h);
}
lg(printArrayLikeArguments2());

function printArrayLikeArguments3(...args) {
    lg(typeof args);
    lg("args length " + args.length); // <----------------------------- failed : arguments.join *NOT* a function
    for (let i = 0; i < args.length; i++) { // <----------------------------- failed
        lg(args[i]);
    }
}
lg(printArrayLikeArguments3());