lg(GetScriptName());

let weakMap = new WeakMap();
let obj10 = {};
weakMap.set(obj10, "ok"); // works fine
//weakMap.set("test", "Whoops"); // error, "test" is not an object || TypeError: Invalid value used as weak map key

let john3 = { name: "John" };
let weakMap2 = new WeakMap();
weakMap2.set(john3, "...");

lg(weakMap2.get(john3)); // if john3 != null, then "get" will success

//john3 = null;
//lg(weakMap2.get(john3)); // if john3 == null, then "undefined"

// WeakMap does not support iteration and methods keys(), values(), entries()
// get 
weakMap2.get(john3);
// set 
weakMap2.set(new Object(), "new Object");
// has 
lg(weakMap2.has(john3));
// delete
weakMap2.delete(john3);
lg(weakMap2.get(john3)); // undefined

// Use case : additional data
// data in weakMap will be "disabled" automatically when "key" (object) is removed from memory
let john_obj = {d:"data"};
let weakMap3 = new WeakMap();
weakMap3.set(john_obj, "test");
lg(weakMap3.get(john_obj));

// Use case : caching
//let cache = new Map();
let cache = new WeakMap();
function process(obj){
    if (!cache.has(obj)){
        let result = obj;
        cache.set(obj, result);
    }
    return cache.get(obj);
}

let obj21 = {};
let result1 = process(obj21); // calculated
let result2 = process(obj21); // remembered result taken from cache
obj21 = null;
lg(cache.size); // If WeakMap, though "undefined" due to WeakMap don't have keys/values/...blabla, but will be removed from memory soon

// Use case : WeakSet
// 
let visitedSet = new WeakSet();
let john4 = {name: "John"};
let pete4 = {name: "Pete"};
let mary4 = {name: "Mary"};

visitedSet.add(john4);
visitedSet.add(pete4);
visitedSet.add(mary4);

lg(visitedSet.has(john4));
lg(visitedSet.has(mary4));

lg("++++++++++++ WeakSet ++++++++++++");
john4 = null;
lg(visitedSet.has(john4));
lg(visitedSet.has(mary4));

let messages = [
    {text: "hello", from: "John"},
    {text: "how goes?", from: "John"},
    {text: "see you soon", from: "Alice"}
]

let readMessages = new WeakSet();
readMessages.add(messages[0]);
/*  readMessages.add(messages[1]); */
readMessages.add(messages[0]);
lg("Read message 0: " + readMessages.has(messages[0]));
messages.shift(); 
lg("Read message 0: " + readMessages.has(messages[0])); // message 1 -> message 0, doesn't have message 1 in WeakSet, so failed

//Or use symbol
let isFuck = Symbol("isRead");
messages[0][isFuck] = true;
lg(messages[0][isFuck]);

let readMap = new WeakMap();
readMap.set(messages[0], new Date(2018, 1, 1));
lg('Has message 0 : ' + readMap.has(messages[0]));
lg('Message 0 read date : ' + readMap.get(messages[0]));