lg(GetScriptName());

function f_recursion(b) {
    currentSum += b;
    return f_recursion();
}