
lg(GetScriptName());

// https://stackoverflow.com/questions/18541940/map-vs-object-in-javascript
// An Object has a prototype, so there are default keys in the map. However, this can be bypassed using map = Object.create(null). The keys of an Object are Strings, where they can be any value for a Map. You can get the size of a Map easily while you have to manually keep track of size for an Object.
// Use maps over objects when keys are unknown until run time, and when all keys are the same type and all values are the same type.
// Use objects when there is logic that operates on individual elements.

let map = new Map();

// set
map.set('1', 'str1'); // string key
map.set(1, 'num1'); // numeric key
map.set(true, 'bool1'); // bool key

// get instead of map[key] 
lg(map.get(1));
lg(map.get('1'));
lg(map.size);

// has
lg(map.has(true));

// equivalence, use ===, SameValueZero
map.set(NaN, 'NaN');
lg('map has NaN : ' +map.has(NaN));

// iteration
let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
    lg(vegetable); // cucumber, tomatoes, onion
}
for (let vegetable of recipeMap.values()) {
    lg(vegetable); // cucumber, tomatoes, onion
}

// iterate goes same order as `insertion`
for (let entry of recipeMap){
    lg(entry);
}

// forEach
recipeMap.forEach((value, key, map) => {
    lg(`${key} : ${value}`);
});

// Map from Object
let obj_map = {
    name: "John",
    age: 30
};
let map2 = new Map(Object.entries(obj_map));
lg(map2.get('name'));

// Object from Map
let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
]);
lg(prices);

// fromEntries <-> entries
let obj_fromentries = Object.fromEntries(map2.entries()); // make a plain object
lg(obj_fromentries);

////////////////////////////////////////
// Set
////////////////////////////////////////
let set2 = new Set();
let john2 = { name: "John" };
let pete2 = { name: "Pete" };
let mary2 = { name: "Mary" };

set2.add(john2);
set2.add(pete2);
set2.add(mary2);
set2.add(john2);
set2.add(pete2);

lg(set2.size);

for(let user of set2){
    lg(user.name);
}

let set3 = new Set(["oranges", "apples", "bananas"]);
for(let value of set2) lg(value);

set3.forEach((value, valueAgain, set3)=>{
    lg(value);
});

let obj_fromentries_set = Object.fromEntries(set3.entries());
lg(obj_fromentries_set);