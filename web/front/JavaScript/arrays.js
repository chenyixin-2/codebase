lg(GetScriptName())

let arr = new Array()
let arr2 = []

arr2[0] = 10
arr2[1] = 20
arr2[2] = function () {
	lg("hello")
}

lg(arr2[0]) // undefined
lg(arr2) //

arr2[2]()

arr.push(1)
arr.push(2)
arr.push(3)

arr.shift() // pop first
lg(arr)

arr.unshift(0, 1) // push first
lg(arr)

arr[9999] = 5 // [0, 1, 2, 3, empty × 9995, 5]
lg(arr)
lg("array length when using arr[9999] : " + arr.length)

/*  Methods push/pop run fast, while shift/unshift are slow. */

arr.push(1) // append at last
lg(arr)
arr.pop() // pop at last
lg(arr)

// new array
let fruits = new Array("Apple", "Pear", "etc")
let fruits_empty = new Array(2)
lg(fruits_empty.length)

// multi-dimensional array
let matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
]
lg(matrix)

// to string
lg(String(fruits) === "Apple,Pear,etc") // true

//
lg([] + 1) // "1"
lg([1] + 1) // "11"
lg([1, 2] + 1) // "1,21"

//
lg("" + 1) // "1"
lg("1" + 1) // "11"
lg("1,2" + 1) // "1,21"

// delete
lg(fruits)
lg(fruits.length)
delete fruits[0]
lg(fruits)
lg(fruits.length) // still the original length 3, and "empty"

// delete & insert
fruits.splice(fruits.length, 2, { test: 1 }, "2")
lg(fruits)
lg(fruits.length) // append to the end of array

fruits.splice(-1, 0, 3, 4) // deleteCount = 0 => insert only isntead of delete
lg(fruits)
lg(fruits.length)

// extract
let some_fruits = fruits.slice(2, 4)
lg(some_fruits)
lg(some_fruits.length)

// concat
let more_fruits_1 = ["Pinaple", "Orange"]
let more_fruits_2 = ["Watermallon", "Mango"]
some_fruits = some_fruits.concat(more_fruits_1, more_fruits_2)

// iterate
some_fruits.forEach((item, index, array) => {
	lg(`item : ${item} , index : ${index} , array : ${array}`)
})
some_fruits.forEach(lg) // function object

// search in an array
lg("+++++++++++ find +++++++++++")
lg(some_fruits.find((item) => item == "Orange"))
lg(some_fruits.findIndex((item) => item == "Orange"))
lg("+++++++++++ find +++++++++++")

lg(some_fruits.indexOf("Pinaple"))
lg(some_fruits.lastIndexOf("Pinaple"))
lg(some_fruits.indexOf(null))

lg(some_fruits.includes("Mango")) // use "===" for comparison

// search failed for ===
const nanArray = [NaN]
lg(nanArray.indexOf(NaN)) // -1, NaN is unique, indexOf use ===, so failed
lg(nanArray.includes(NaN))

// filter
const users = [
	{ id: 1, name: "John" },
	{ id: 2, name: "Pete" },
	{ id: 3, name: "Mary" },
]

let res = users.filter((item, index, array) => {
	return item.id < 3
})
lg(res)

// sort
// sort by Object parameter
let sortByNames = users.sort((user1, user2) => {
	return user1.name.localeCompare(user2)
})
lg(sortByNames)

const countries = ["China", "Österreich", "Andorra", "Vietnam"]
let sortByAlphabet = countries.sort((a, b) => a.localeCompare(b))
lg(sortByAlphabet)

// reverse
let rev_coutries = countries.reverse()
lg(rev_coutries)

// split by delimiter
names = "Bilbo, Gandalf, Nazgul"
let name_arr = names.split(", ")
for (let name of name_arr) {
	lg(`A message to ${name}.`) // A message to Bilbo  (and other names)
}

// split by letter
let split_by_letter = "word"
split_by_letter = split_by_letter.split("")

// join by delimiter
lg(countries.join("#"))

// map : transform array, array => array of values : 1 to 1 mapping
names = users.map((item) => item.name)
lg(names)

// reduce => single value
let red_arr = [1, 2, 3, 4, 5]
let red_res = red_arr.reduce((accumulator, current) => accumulator + current, 0)
lg(red_res)

// type
lg(typeof {}) // both are objects
lg(typeof []) // both are objects

lg(Array.isArray({})) // false
lg(Array.isArray([])) // true

// array-like arguments
function printArrayLikeArguments(...args) {
	lg(typeof arguments) // <----------------------------- objects
	for (let i = 0; i < arguments.length; i++) {
		lg(arguments[i])
	}
}
printArrayLikeArguments(1, 2, "z", "s")

function test() {
	var pLists = []
	pLists.push("")
}

let target = new ArrayBuffer(80)
let src = new Uint8Array(20)
for (i = 0; i < 26; ++i) {
    src[i] = i
}
src.copyWithin(target, 7)