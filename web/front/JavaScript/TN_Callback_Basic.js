lg(GetScriptName());

// //////////////////////////////////////////////////////////////////
// callbacks
//////////////////////////////////////////////////////////////////
function loadScript(src, callback) {
    // creates a <script> tag and append it to the page
    // this causes the script with given src to start loading and run when complete
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    // document.head.append(script);
}
// loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
//     lg(`Cool, the script ${script.src} is loaded`);
//     lg(_); // function declared in the loaded script
// });

//////////////////////////////////////////////////////////////////
// callback in callbacks
// Pyramid of Doom
//////////////////////////////////////////////////////////////////
loadScript('1.js', function (error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('2.js', function (error, script) {
            if (error) {
                handleError(error);
            } else {
                // ...
                loadScript('3.js', function (error, script) {
                    if (error) {
                        handleError(error);
                    } else {
                        // ...continue after all scripts are loaded (*)
                    }
                });
            }
        })
    }
});
//////////////////////////////////////////////////////////////////
// Promise : <----------------------------- Producer / Executor
// state  : pending -> fulfilled 
//                  -> rejected
// reuslt : undefined -> value
//                    -> error
//////////////////////////////////////////////////////////////////
let promise = new Promise(function (resolve, reject) {            // <----------------------------- executor
    setTimeout(() => resolve("done"), 1000);                      // resolve
});
let promise2 = new Promise(function (resolve, reject) {            // <----------------------------- executor
    setTimeout(() => reject(new Error("Whoops!")), 1000);          // reject
});
//////////////////////////////////////////////////////////////////
// Promise : <----------------------------- Consumer 
// .then / .catch / .finally
// finally (ended anyway) => then ()
//////////////////////////////////////////////////////////////////
promise.then(
    result => lg(result),
    error => lg(error)
);
promise2.then(
    result => lg(result),
    error => lg(error) // shows "Error : whoops"
);
// finally
let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("result"), 2000);
})
    .finally(() => lg("Promise ended anyway"))
    .then(result => lg(result));
//////////////////////////////////////////////////////////////////
// loadscript with promise
//////////////////////////////////////////////////////////////////
function loadScript_Promise(src) {
    return new Promise(function (resolve, reject) {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script loaded error for ${src}`));
        document.head.append(script);
    })
}
let promise_loadscript = loadScript_Promise("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
promise_loadscript.then(
    script => lg(`${script.src} is loaded`),
    error => lg(`Error: ${error.message}`)
);
promise_loadscript.then(script => lg('Another handler...'));
//////////////////////////////////////////////////////////////////
// delay with a promise
//////////////////////////////////////////////////////////////////
function delay(ms) {
    // return new Promise(function (resolve, reject) {
    //     setTimeout(() => resolve("ok"), ms);
    // });
    return new Promise(resolve => setTimeout(resolve, ms));  // <----------------------------- resolve here can resolve any kind of parameters
};
delay(3000).then(() => lg('runs after 3 seconds'));
//////////////////////////////////////////////////////////////////
// promise chaining
// sequence of asynchronous tasks to be performed one after another
//////////////////////////////////////////////////////////////////
let promise_chain = new Promise(function (resolve, reject) {
    lg("promise chaining");
    setTimeout(() => resolve(1), 1000);
}).then(function (result) {
    lg(result);
    return result * 2;
}).then(function (result) {
    lg(result);
    return result * 2;
}).then(function (result) {
    lg(result);
    lg("promise chaining ++++++++++++ ended");
    return result * 2;
});

//////////////////////////////////////////////////////////////////
// promise return promise
//////////////////////////////////////////////////////////////////
new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
}).then(function (result) {
    lg(result); // 1
    return new Promise((resolve, reject) => { // (*)            // <----------------------------- return promsie
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function (result) { // (**)
    lg(result); // 2
    return new Promise((resolve, reject) => {                   // <----------------------------- return promise
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function (result) {
    lg(result); // 4
});

//////////////////////////////////////////////////////////////////
// chain of LoadScript
//////////////////////////////////////////////////////////////////
loadScript_Promise("/article/promise-chaining/one.js")
    .then(function (script) {
        return loadScript("/article/promise-chaining/two.js");
    })
    .then(function (script) {
        return loadScript("/article/promise-chaining/three.js");
    })
    .then(function (script) {
        // use functions declared in scripts
        // to show that they indeed loaded
        one();
        two();
        three();
    });
// the "shorter" using arrow function
loadScript_Promise("/article/promise-chaining/one.js")
    .then(script => loadScript("/article/promise-chaining/two.js"))
    .then(script => loadScript("/article/promise-chaining/three.js"))
    .then(script => {
        // scripts are loaded, we can use functions declared there
        one();
        two();
        three();
    });

// Thenable, overwrite 
class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        lg(resolve);
        setTimeout(() => resolve(this.num * 2), 1000);
    }
}
new Promise(resolve => resolve(1))
    .then(result => {
        return new Thenable(result);
    })
    .then(lg);

// Bigger example: fetch
let promise_fetch = fetch('https://javascript.info/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => { lg(user.name); return user })
    .then(user => fetch(`https://api.github.com/users/${user.name}`)) // connection reset
    .then(response => response.json())
    .then(githubUser => {
        let img = document.createElement('img');
        img.src = githubUser.avartar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);
        setTimeout(() => img.remove(), 3000);
    })
    .catch(error => lg(error.message));
// use promise to wait for timeout
fetch('https://javascript.info/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(githubUser => new Promise(function (resolve, reject) { // (*)
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);
        setTimeout(() => {
            img.remove();
            resolve(githubUser); // (**)
        }, 3000);
    }))
    // triggers after 3 seconds
    // to resolve the timeout
    .then(githubUser => lg(`Finished showing ${githubUser.name}`));

//////////////////////////////////////////////////////////////////
// Error handling for promise
// implicit try...catch
// !!!!! only *synchronous* errors are handled !!!!!!
//////////////////////////////////////////////////////////////////
fetch('https://no-such-server.blabla') // rejects
    .then(response => response.json())
    .catch(err => lg(err)); // TypeError: failed to fetch (the text may vary)
// throw version
new Promise((resolve, reject) => {
    throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!
// "reject" version
new Promise((resolve, reject) => {
    reject(new Error("Whoops"));
}).catch(lg);

// catch "other" accidentlly version
new Promise((resolve, reject) => {
    resolve("ok");
}).then((result) => {
    blabla(); // no such function
}).catch(lg);

//////////////////////////////////////////////////////////////////
// RE-throwing
//////////////////////////////////////////////////////////////////
new Promise((resolve, reject) => {
    throw new Error("Whoops");
}).catch(function (error) {
    lg("The error is handled, continue normally");
}).then(() => lg("Next successfully handler runs"));
new Promise((resolve, reject) => {
    throw new Error("Whoops");
}).catch(function (error) {
    if (error instanceof URIError) {
        // handle it
    } else {
        lg("can't handle such error");
        throw error;                    // <----------------------------- throw it 
    }
})
    .then(() => lg("Next successfully handler runs"))   // <----------------------------- miss it, pass to next "catch"
    .catch(error => {
        lg(`The unknown error has occurred: ${error}`); // <----------------------------- error catched
    })
    .then(() => lg("After handling error, run the next then()")); // <----------------------------- catch next error

//////////////////////////////////////////////////////////////////
// Unhandled rejections
// "unhandledrejection" event : part of the HTML standard
//  The script dies with a message in the console. A similar thing happens with unhandled promise rejections.
//  The JavaScript engine tracks such rejections and generates a global error in that case. You can see it in the console if you run the example above. */
//////////////////////////////////////////////////////////////////
window.addEventListener('unhandledrejection', function (event) {
    lg(event.promise);
    lg(event.reason);
});

new Promise(function () {
    throw new Error("Whoops!");
});