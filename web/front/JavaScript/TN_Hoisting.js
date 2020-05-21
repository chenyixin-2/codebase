lg(GetScriptName());

//////////////////////////////////////////////////////////////////
// hoisting <--> raising
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// called before declarations
// Functoin declarations are hoisted automatically when script begin executing
//////////////////////////////////////////////////////////////////
catName("Chloe");
function catName(name) {
    lg("My cat's name is " + name);
}

//////////////////////////////////////////////////////////////////
// only declarations are hoisted
//////////////////////////////////////////////////////////////////
lg(declaration_hoisted);  // <--------------------- undefined 
var declaration_hoisted;
declaration_hoisted = 6;

try {
    lg(initialization_not_hoisted); // <--------------------- not defined
    initialization_not_hoisted = 6; // no declarations, but only "initialization"
} catch (e) {
    lg(e);
}

try {
    function sayHi_Hoisting() {
        lg(phrase_hoisting);
        var phrase_hoisting = "Hello"; // declaration + assignment
    }

    sayHi_Hoisting();

} catch (error) {
    lg(phrase_hoisting);
}

//////////////////////////////////////////////////////////////////
// not var
//////////////////////////////////////////////////////////////////
try {
    lg(assigned_variable);
    assigned_variable = "assigned variable";
} catch (e) {
    lg(e);
}

//////////////////////////////////////////////////////////////////
// var
//////////////////////////////////////////////////////////////////
lg(var_variable); // declared, but not assigned 
var var_variable = "var variable";

//////////////////////////////////////////////////////////////////
// let 
//////////////////////////////////////////////////////////////////
try {
    lg(let_variable);
    let let_variable = "let variable";
} catch (e) {
    lg(e);
}

//////////////////////////////////////////////////////////////////
// const string
//////////////////////////////////////////////////////////////////
try {
    lg(const_variable);
    const const_variable = "this is const string";
} catch (e) {
    lg(e);
}

//////////////////////////////////////////////////////////////////
// try catch had exceptions
//////////////////////////////////////////////////////////////////
// ok
// error
{
    let test;
    try {
        try {
            test = 1;
            test = 1 / 0;
            throw "manually added";
        } catch (error) {
            lg(test);
        }
    }
    catch (e) {
        lg(e);
    }
}

// error
{
    try {
        try {
            let test = 1;
            test = 1 / 0;
            throw "manually added";
        } catch (error) {
            lg(test);
        }
    }
    catch (e) {
        lg(e);
    }
}