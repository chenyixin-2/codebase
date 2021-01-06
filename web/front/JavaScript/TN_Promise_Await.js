lg(GetScriptName());

debugger

const fun1 = async () =>{
    let p = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done"), 4000)
        setTimeout(() => reject("done"), 10000)
    })
    console.log("ret");
    return p;
}

async function fun2 () {
    let ret = await fun1();
    console.log(ret);
}

fun2()
