lg(GetScriptName());

// instanceof 
let arr = [];
lg(arr instanceof Array);
lg(arr instanceof Object);

{
    //////////////////////////////////////////////////////////////////
    // class *with* Symbol.hasInstance
    //////////////////////////////////////////////////////////////////
    // customize "instanceof" by modify "Symbol.hasInstance"
    class Animal {
        static [Symbol.hasInstance](obj) {
            if (obj.canEat) return true;
        }
    }

    let obj = { canEat: true };
    lg(obj instanceof Animal);

    let animal = new Animal();

    //////////////////////////////////////////////////////////////////
    // class *without* Symbol.hasInstance
    //////////////////////////////////////////////////////////////////
    lg(obj.__proto__ === Object.prototype);
    lg(obj.__proto__ === Animal.prototype);
    lg(obj.__proto__.__proto__ === Animal.prototype);

    lg(animal.__proto__ === Object.prototype);
    lg(animal.__proto__ === Animal.prototype); // true
    lg(animal.__proto__.__proto__ === Animal.prototype); // false

    let obj2 = new Object();
    lg(`PrototypeOf : ${animal.isPrototypeOf(obj)}`);
    lg(`PrototypeOf : ${animal.isPrototypeOf(obj2)}`);

    //////////////////////////////////////////////////////////////////
    // function prototyep
    //////////////////////////////////////////////////////////////////
    function Foo() {}
    function Bar() {}
    function Baz() {}

    Bar.prototype = Object.create(Foo.prototype);
    Baz.prototype = Object.create(Bar.prototype);

    var baz = new Baz();
    lg(Baz.prototype.isPrototypeOf(baz));
    lg(Bar.prototype.isPrototypeOf(baz));
    lg(Foo.prototype.isPrototypeOf(baz));
    lg(Object.prototype.isPrototypeOf(baz)); // object is root of chain
}

//////////////////////////////////////////////////////////////////
// tricks : show object type
//////////////////////////////////////////////////////////////////
{
    let objectToString = Object.prototype.toString;
    let arr = [];

    lg(objectToString.call(arr));

    lg(objectToString.call(123));

    lg(objectToString.call(null));

    lg(objectToString.call(alert));
}