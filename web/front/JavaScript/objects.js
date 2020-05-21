lg(GetScriptName());

let user = new Object();
let user1 = {};

let user2 = {
    name : "John",
    age : 30
};

lg(user2.name);
lg(user2.age);

lg(user2["age"]);
delete(user2["age"]);

// variable as property name
let fruit = "apple";
let bag = {
    [fruit]: 5,
};

lg(bag.apple);

let bag2 = {
    [fruit + 'Computed']: 5
};

// 
let obj = {
    for: 1,
    let: 2,
    return: 3
  };
  
lg( obj.for + obj.let + obj.return );  // 6


// key values in object
lg("keys values")
let user3 = {};
lg(user.noSuchProperties === undefined);

let user4 = { name:"John", age:30 };
lg("age" in user4);
lg("name" in user4);

for (let key in user4)
{
    lg(key);
    lg(user4[key]);
}

let codes = {
    "49" : "Germany",
    "41" : "Swizerland",
    "1" : "USA"
};

for (let code in codes){
    lg(code);
};

// comparision by reference
let a = {};
let b = a;
lg( a == b); // true, ref smme object
lg( a === b); // true, ref same object

a = {};
b = {}; // 2 in-dependent objects

lg( a==b ); // false, reference 2 different objects

let user5 = { name: "John"};
let ps1 = { canView : true };
let ps2 = { canEdit : true};

Object.assign(user5, ps1, ps2);
for (let key in user5){
    lg(`key : ${key}, users : ${user5[key]}`);
};

Object.assign(user5, {"newField":5});
for (let key in user5){
    lg(`key : ${key}, value : ${user5[key]}`);
};

Object.assign(user5, {"copy":{"f1":1, "f2":2}});

// shallow copy
let clone = Object.assign({}, user5);
// deep copy
let deepClone = _.cloneDeep(user5);

user5["copy"]["f1"] = 4; // change value

lg("Origin One");
lg(user5["copy"]["f1"]); // 4

lg("Clone");
lg(clone["copy"]["f1"]); // 4

lg("Deep Clone");
lg(deepClone["copy"]["f1"]); // 1

lg("+++++++++++ Constructor ++++++++++");
// constructor functions
function User(name){
    this.name = name;
    this.isAdmin = false;
}

let user6 = new User("Jack");
lg(user.name); // jack 
lg(user.isAdmin); // false

// constructor mode test
function User2(name){
    lg(new.target);
}

User2(); // failed, with "undefined"

new User2(); // ok, "new" trigger new.target

// return from constructor
function BigUser(){
    this.name = "John";

    return { name: "Godzilla" };
}
lg(new BigUser().name);

// return "this"
function SmallUser(){
    this.name = "John";

    return; // <-- return this
}

lg(new SmallUser().name);

// constructor with parenthese
let user7 = new BigUser;
let user8 = new BigUser();

function UserWithMethod(name){
    this.name = name;

    this.sayHi = function() {
        lg("My name is " + this.name);
    }
}

let john = new UserWithMethod("John");
john.sayHi();