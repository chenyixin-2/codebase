lg(GetScriptName());

//////////////////////////////////////////////////////////////////
// Mi-xin – is a generic object-oriented programming term:
// augment a class by adding multiple behaviours, like event-handling
// making a class that contains methods for other classes.
// Multiple inheritance : mixins can be implemented by copying methods into prototype
//////////////////////////////////////////////////////////////////

{
    let sayHiMixin = {
        sayHi() {
            lg(`Hello ${this.name}`);
        },
        sayBye() {
            lg(`Bye ${this.name}`);
        }
    }
    class User {
        constructor(name) {
            this.name = name;
        }
    }
    // copy 
    Object.assign(User.prototype, sayHiMixin);
    // now User can say hi
    new User("Dude").sayHi(); // hello, Dude !
}


// no inheritance, but simple "method copying", User may inherit from another class 
// include the mixin to "mix-in"

let sayMixin = {
    say(phrase) {
        lg(phrase);
    }
}

let sayHiMixin = {
    __proto__: sayMixin, // Object.create to set the prototype here

    sayHi() {
        // call parent method
        super.say(`Hello ${this.name}`); // (*)
    },
    sayBye() {
        super.say(`Bye ${this.name}`); // (*)
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

new User("Dude").sayHi();

let eventMixin = {
    /**
     * Subscribe to event, usage:
     * menu.on('select', function(item){...})
     */
    on(eventName, handler) {
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    },

    /**
     * Cancel the subscription, usage:
     */
    off(eventName, handler) {
        let handlers = this._eventHandlers?.[eventName];
        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i--, 1);
            }
        }
    },
    /**
     * Generate an event with the given name and data
     * this.trigger('select', data1, data2);
     */
    trigger(eventName, ...args) {
        if (!this._eventHandlers || !this._eventHandlers[eventName]) {
            return;
        }
        // call the hanlders
        this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    },
}

// Make a class
class Menu {
    choose(value) {
        this.trigger("select", value);  // 
    }
}

Object.assign(Menu.prototype, eventMixin);
let menu = new Menu();

menu.on("select", value => lg(`Value selected: ${value}`));
menu.choose("123");