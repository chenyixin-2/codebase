lg(GetScriptName());

"use strict"
//////////////////////////////////////////////////////////////////
// func.bind(thisArg, arg1, arg2)
//////////////////////////////////////////////////////////////////

let user_binding = {
    firstName: "John",
    sayHi() {
        lg(`Hello, ${this.firstName}!`);
    }
};

setTimeout(user_binding.sayHi, 1000); // Hello, undefined!

let callback = user_binding.sayHi;
setTimeout(callback, 1000);

// solution 1, wrapping function : function() { user.sayHi() }
lg("User Binding : " + user_binding);
setTimeout(function () {
    user_binding.sayHi(); //  it receives user from the outer lexical environment, and then calls the method normally.
}, 1000);

// shorter
setTimeout(() => {
    user_binding.sayHi(); //  it receives user from the outer lexical environment, and then calls the method normally.
}, 1000);

// solution 2, bind
// object + function
let user_withbind = {
    firstName: "John" // <----------------------------- separate object
};
function func() { // <----------------------------- separate function
    lg(this.firstName);
}
let funcUser = func.bind(user); // <----------------------------- bind
funcUser(); // <----------------------------- call this function

let sayHi_bind = user_binding.sayHi.bind(user);
sayHi_bind();
setTimeout(sayHi_bind, 1000);

// pre-bind will be used
// user_binding = {
//     sayHi() { lg("Another user in setTimeout!"); } // <----------------------------- change to another user will use "pre-bind" value
// };

user_binding2 = {
    say(phrase) {
        lg(`${phrase}, ${this.firstName}`);
    }
}
let say_bind = user_binding2.say.bind(user_binding);
say_bind("Hellow");
say_bind("Bye binding");

// Bind all functions
for (let key in user_binding) {
    if (typeof user[key] == 'function') {
        user[key] = user[key].bind(user);
    }
}

// Partitial Bind
function mul(a, b) {
    return a * b;
}

let double_bind = mul.bind(null, 2);
lg(double_bind(3));
lg(double_bind(4));

// argsBound -> args would be bound
function partitial(func, ...argsBound) {
    return function (...args) {
        return func.call(this, ...argsBound, ...args);
    }
}

let user_partitial = {
    firstName: "John",
    say(time, phrase) {
        lg(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};

user_partitial.sayNow = partitial(user_partitial.say, new Date().getHours() + ':' + new Date().getMinutes());

user_partitial.sayNow("Hello");
user_partitial.sayNow("Bye");

function ff() {
    lg('ff : ');
    lg(this); // this bind to "window" object
};

let user_bindinging = {
    test: "string",
    g: ff.bind(null)
};
user_bindinging.g();

//////////////////////////////////////////////////////////////////
// Bound @ creation time
//////////////////////////////////////////////////////////////////
function fff() {
    lg('fff');
    lg(this); // this bind to "window" object <----------------------------- both for Chrome / FireFox
    lg(this.name);
};

fff_bind = fff.bind({ name: "John" }).bind({ name: "Ann" });
fff();

//////////////////////////////////////////////////////////////////
// fix a function that loses "this"
//////////////////////////////////////////////////////////////////
function askPassword(ok, fail) {
    let password = prompt("Password?", '1');
    if (password == "rockstar") ok();
    else fail();
}

let user_bind_pwd = {
    name: 'John',

    loginOk() {
        lg(`${this.name} logged in`);
    },

    loginFail() {
        lg(`${this.name} failed to log in`);
    },

};

try {
    askPassword(user_bind_pwd.loginOk, user_bind_pwd.loginFail);
} catch (e) {
    lg(e);  // "this" is not bind
}

try {
    askPassword(user_bind_pwd.loginOk.bind(user_bind_pwd), user_bind_pwd.loginFail.bind(user_bind_pwd));
} catch (e) {
    lg(e);  // "this" is not bind
}

//////////////////////////////////////////////////////////////////
// bind multiple class
//////////////////////////////////////////////////////////////////
function askPassword(ok, fail) {
    let password = prompt("Password?", '1');
    if (password == "rockstar") ok();
    else fail();
}

let user_bind_pwd_partial = {
    name: 'John',

    login(result) {
        lg(this.name + (result ? ' logged in' : ' failed to log in'));
    }
};

askPassword(user_bind_pwd_partial.login.bind(user_bind_pwd_partial, true), user_bind_pwd_partial.login.bind(user_bind_pwd_partial, false)); // ?