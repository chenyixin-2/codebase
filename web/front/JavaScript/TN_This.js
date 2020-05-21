lg(GetScriptName());

let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(
            student => lg(this.title + ': ' + student)   // <----------------------------- "this" is taken from outside lexi environment
        );
    }
};

group.showList();

group.showList = function () {
    this.students.forEach(function (student) {
        // Error: Cannot read property 'title' of undefined
        lg(this.title + ' : ' + student); // <----------------------------- this 指向外层 -> title 
    });
};

group.showList();