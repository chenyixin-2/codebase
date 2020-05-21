lg(GetScriptName());

const previous = { head: 1, previous: null };

previous.previous = 1;

lg(previous);

let new_previous = { head: 1, previous: 2 };
previous = new_previous; // Uncaught TypeError: Assignment to constant variable.
lg(previous);