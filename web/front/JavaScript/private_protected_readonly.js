//////////////////////////////////////////////////////////////////
// Default is "Public"
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// Read-only : by only "getter"
//////////////////////////////////////////////////////////////////
{
    class CoffeeMachine {
        // ...
        _power = "power";

        constructor(power) {
            this._power = power;
        }

        get power() {
            return this._power;
        }

    }

    // create the coffee machine
    let coffeeMachine = new CoffeeMachine(100);
    lg(`Power is: ${coffeeMachine.power}W`); // Power is: 100W
    coffeeMachine.power = 25; // Error (no setter)
}

//////////////////////////////////////////////////////////////////
// Protected : read + write
//////////////////////////////////////////////////////////////////
{
    class CoffeeMachine {
        _waterAmount = 0;

        setWaterAmount(value) {
            if (value < 0) throw new Error("Negative water");
            this._waterAmount = value;
        }

        getWaterAmount() {
            return this._waterAmount;
        }
    }
}

//////////////////////////////////////////////////////////////////
// Private : use # to hide everything
//////////////////////////////////////////////////////////////////
{
    class CoffeeMachine {
        #waterLimit = 200;

        #checkWater(value) {
            if (value < 0) throw new Error("Negative water");
            if (value > this.#waterLimit) throw new Error("Too much water");
        }
    }

    let coffeeMachine = new CoffeeMachine();
    // can't access privates from outside of the class
    coffeeMachine.#checkWater(); // Error
    coffeeMachine.#waterLimit = 1000; // Error
}