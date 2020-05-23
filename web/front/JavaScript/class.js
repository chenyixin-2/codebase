lg(GetScriptName());

//////////////////////////////////////////////////////////////////
// Template of class
//////////////////////////////////////////////////////////////////
// class MyClass {
//     prop = value; // property

//     constructor({ }) { // constructor
//         // ...
//     }

//     method({ }) { } // method

//     get something({ }) { } // getter method
//     set something({ }) { } // setter method

//     [Symbol.iterator]() { } // method with computed name (symbol here)
//     // ...
// }

// class actually is a function
// store the class methods in User.prototype
// after new User object is created, it's taken from the prototype
// Class methods : non-enumerable
// 
class User {
    constructor(name) { this.name = name; }
    sayHi() { alert(this.name); }
}

lg(typeof User); // function
let u = new User();

lg(User.prototype);
lg(User.prototype.__proto__);
lg(Object.getOwnPropertyNames(User.prototype));

//////////////////////////////////////////////////////////////////
// Another kind of expression
//////////////////////////////////////////////////////////////////
let User_class = class {
    sayHi() {
        alert("Hello");
    }
};

//////////////////////////////////////////////////////////////////
// Make class
//////////////////////////////////////////////////////////////////
{
    function makeClass(phrase) {
        // declare a class and return it
        return class {
            sayHi() {
                lg(phrase);
            }
        }
    }

    let User = makeClass("Hello");
    new User().sayHi(); // hello
}

//////////////////////////////////////////////////////////////////
// setter/getter, computed properties
//////////////////////////////////////////////////////////////////
{
    class User {

        constructor(name) {
            // invokes the setter
            this.name = name;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            if (value.length < 4) {
                lg("Name is too short.");
                return;
            }
            this._name = value;
        }

        ['say' + 'Hi']() {
            lg("Hello");
        }

    }

    let user = new User("John");
    lg(user.name); // John

    user = new User(""); // Name is too short.
}

//////////////////////////////////////////////////////////////////
// Class fields
//////////////////////////////////////////////////////////////////
// filed = "xxx"
// more see "TN_Losing_This.js"
{
    class User {
        name = "John"; // <----------------------------- a property

        sayHi() {
            lg(`Hello, ${this.name}!`);
        }
    }

    new User().sayHi(); // Hello, John!

    let user = new User();
    lg(user.name); // John
    lg(User.prototype.name); // undefined
}

{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        run(speed) {
            this.speed = speed;
            lg(`${this.name} runs with speed ${this.speed}.`);
        }
        stop() {
            this.speed = 0;
            lg(`${this.name} stands still.`);
        }
    }
    let animal = new Animal("My Animal");

    class Rabbit extends Animal {
        hide() {
            lg(`${this.name} hides!`);
        }
    }
    let rabbit = new Rabbit("white rabbit");

    rabbit.run(5);
    rabbit.hide();
}

// extends from a class returned from "f"
{
    function f(phrase) {
        return class {
            sayHi() { lg(phrase) }
        }
    }
    class User extends f("Hello") { }
    new User().sayHi(); // hello 
}

{
    class Rabbit extends Animal {
        hide() {
            lg(`${this.name} hides!`);
        }

        stop() {
            super.stop();
            this.hide();
        }
    }
    let rabbit = new Rabbit("White Rabbit");

    rabbit.run(5);
    rabbit.stop();
}

// arrow function had "no" super
{
    class Rabbit extends Animal {
        stop() {
            setTimeout(() => super.stop(), 1000);
        }
    }
    let rabbit = new Rabbit("Black Rabbit");
    rabbit.stop();

    try {
        setTimeout(function () { super.stop() }, 1000);
    } catch (e) {
        lg(e);
    }
}


{
    class Rabbit extends Animal {
        earLength = 0;

        constructor(name, earLength){
            super(name);
            this.earLength = earLength;
        }

        stop() {
            setTimeout(() => super.stop(), 1000);
        }
    }
    let rabbit = new Rabbit("Black Rabbit");
    rabbit.stop();

    try {
        setTimeout(function () { super.stop() }, 1000);
    } catch (e) {
        lg(e);
    }
}