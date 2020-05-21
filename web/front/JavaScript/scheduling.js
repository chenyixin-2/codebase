lg(GetScriptName());

let timeoutTimerId = setTimeout((...echo) => lg(typeof echo), 1000, 'a', 'b');
let intervalTimerId = setInterval((...echo) => lg(typeof echo), 1000, 'a', 'b');

// clear timeout after some time
let clear = confirm("Clear timeout ?");
if (clear == true) {
    clearTimeout(timeoutTimerId);
    clearInterval(intervalTimerId);
} else {
    clearTimeout(timeoutTimerId);
    setTimeout(() => clearInterval(intervalTimerId), 1 * 1000);
}

// Zero delay is no zero delay
// There’s a limitation of how often nested timers can run. 
// The HTML5 standard says: “after five nested timers, the interval is forced to be at least 4 milliseconds.

// For example, the in-browser timer may slow down for a lot of reasons:

// The CPU is overloaded.
// The browser tab is in the background mode.
// The laptop is on battery.

let start = Date.now();
let times = [];

setTimeout(function run() {
    times.push(Date.now() - start);
    if (start + 100 < Date.now()) lg(times);
    else setTimeout(run); // nested function
})