lg(GetScriptName());

let obj_getset = {
    god: 0,
    get God() {
        return this.god; // undefined, why ?
    },
    set God(value) {
        this.god = value;
    }
};

lg(obj.God);
obj.God = 10;
lg(obj.God);