lg(GetScriptName());

//////////////////////////////////////////////////////////////////
// pre-condition check
//////////////////////////////////////////////////////////////////

// field in xxx
let obj_tricks = {'field': 1};
if ( 'field' in obj_tricks ){
    lg('in');
}

// is array object
let array = [1, 2];
if (array !== null && Array.isArray(array)){
    lg("Array !");
}