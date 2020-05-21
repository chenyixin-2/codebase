lg(GetScriptName());

let arr_destructuring = ["Ilya", "Kantor"];
let [firstName, surName] = arr;

lg(firstName);
lg(surName);

[firstName, surName] = "Ilya Kantor".split(' ');
firstName = arr[0];
surName = arr[1];

[firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
lg(firstName);
lg(title);

// working with any "Iterable" on the *right side*
let [aaa,bbb,ccc] = "abc"
lg(aaa)
lg(bbb)
lg(ccc)

let [one, two, three] = new Set([1, 2, 3]);
lg(one);
lg(two);
lg(three);

// assign to anything
let user_destructure = {};
[user_destructure.name, user_destructure.surname] = "Ilya Kantor".split(' ');

// Looping with .entries()
let user_assign = {
    name: "John",
    age: 30
};
for(let [key, value] of Object.entries(user_assign)){
    lg(`${key} : ${value}`);
}

// rest
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
lg(name1);
lg(name2);
lg(rest[0]);
lg(rest[1]);
lg(rest.length);

// default values
[firstName, surName] = [];
lg(firstName);
lg(surName);

// prompt for default name
[firstName = prompt('name?'), surName = prompt('surname?')] = ["Julius", "Caesar"];
//[firstName = prompt('name?'), surName = prompt('surname?')] = []; // will prompt for questions
lg(firstName);
lg(surName);

// object destructuring
let {var1, var2} = {var2:"var2",var1:"var1"};
lg(var1);
lg(var2);

let options = {
    t: "Menu",
    w: 100,
    h: 200
};

let {h, w, t} = options; // parameter doesn't matter
lg(t);
lg(w);
lg(h);

// use () to show JavaScript *that's not a code block*
let title2, width, height;
({title2, width, height} = {title2:"Menu", width:200, height: 100});
lg(title2);

// nested destructuring
let options_destructuring = {
    size: {
        width: 100,
        height: 200
    },
    items: ["cake", "donut"],
    extra: true
};

let {
    size: {
        width1,
        height1
    },
    items: [item1, item2],
    title3 = "Menu"
} = options_destructuring

lg(title3);
lg(width1);
lg(height1);
lg(item1);
lg(item2);

// smart function parameters
function showMenu(title = "Untitled", width=200, height=100, items=[]){
}
// ugly
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"]);
// smart
let options_smart = {
    title_smart: "My Menu",
    items_smart:["Item1", "Item2"]
}

function showMenuSmart({ title_smart = "My Menu", width = 200, height = 100, items_smart=["Item1", "Item2"]}){
    lg(`${title_smart} ${items_smart}`);
}
showMenuSmart(options_smart);

// parameter functions
function showTemplate({varName = 10}){
}
showTemplate({}); // ok, 

// showTemplate(); // wrong for showTemplate 

// 
function showTemplate2({title = "Menu", widht = 100, height = 200} = {}){
    lg("ShowTemplate2")
}
showTemplate2(); // ok for showTemplate2

let user_dest = {
    name: "John",
    years: 30
};

// 
// name <-> name 
// years : age_dest
// isAdmin : default value
let {name, years:age_dest, isAdimin = false} = user_dest;
lg(name);
lg(age_dest);
lg(isAdimin);

// the maximum
function topSalary(salaries){
    let max = 0 ;
    let maxName = null;

    for(const [name, salary] of Object.entries(salaries)){  // <---------------------------- const
        if (max < salary){
            max = salary;
            maxName = name;
        }
    }
    return {"max":max, "maxName" :maxName};
}

lg(topSalary(salaries));