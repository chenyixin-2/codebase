lg(GetScriptName());

let prices2 = {
    banana: 1,
    orange: 2,
    meat: 4
};

let doublePrices = Object.fromEntries(
    Object.entries(prices2).map(([key, value]) => [key, value * 2])
);
lg(doublePrices);
lg(doublePrices.meat);

function sumSalaries(salaries){
    let sum = 0;
    for(let salary of Object.values(salaries)){
        sum += salary;
    }
    return sum;
}

let salaries = {        //object
    "John": 100,
    "Pete": 300,
    "Mary": 250
}
lg(sumSalaries(salaries));

function sumSalaries2(salaries){
    return Object.values(salaries).reduce((accumulator, current) => accumulator + current, 0);
}
lg(sumSalaries2(salaries));

// Count : count the num of properties in the object
let user_count = {
    name : 'John',
    age : 30
}
//lg(`Num of properties in the object : ` + count(user_count));