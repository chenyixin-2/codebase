lg(GetScriptName());

let sovle = function f(x) {
    if (x == 1) return 1;
    if (x == 2) return 2;
    if (x == 3) return 4;
    return (f(x - 1) + f(x - 2) * 2 + f(x - 3) * 4);
}
//lg(sovle(100));

let solve_norecusion = function (last) {
    let f = [];
    f[1] = 1;
    f[2] = 2;
    f[3] = 4;

    for (let i = 4; i <= last; ++i) {
        f[i] = f[i - 1] + f[i - 2] * 2 + f[i - 3] * 4;
    }

    return f[last];
};
lg(solve_norecusion(100));

var factorial = function (number) {
    if (number <= 0) { // terminal case
        return 1;
    } else { // block to execute
        return (number * factorial(number - 1));
    }
};
lg(factorial(6));
