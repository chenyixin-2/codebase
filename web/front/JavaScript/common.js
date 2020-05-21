"use strict"
function GetScriptName(){
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length-1];
    var scriptName = "+++++++++++++++++++++ " + lastScript.src + " +++++++++++++++++++++" ;
    return scriptName;
}

let lg = console.log;

lg(GetScriptName());