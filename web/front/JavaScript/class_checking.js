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
}
