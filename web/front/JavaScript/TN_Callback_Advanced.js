lg(GetScriptName());

// 5 *static* methods of Promise method
// let promise = Promise.all([...promises...]);

// example #1
{
    lg("Explicit Promise with \"new\" ");
    Promise.all([
        new Promise(resolve => setTimeout(() => resolve("example#1_1"), 3000)), // order 1st, no matter "elapse time"
        new Promise(resolve => setTimeout(() => resolve("example#1_2"), 2000)), // order 2nd, no matter "elapse time"
        new Promise(resolve => setTimeout(() => resolve("example#1_3"), 1000)), // order 3rd, no matter "elapse time"
    ]).then(lg);
}

{
    let requests = [
        'https://api.github.com/users/iliakan',
        'https://api.github.com/users/remy',
        'https://api.github.com/users/jeresig'
    ].map(url => fetch(url));

    Promise.all(requests)
        .then(
            responses =>
                responses.forEach(response =>
                    lg(`${response.url}: ${response.status}`))
        );
}

{
    let names = ['iliakan', 'remy', 'jeresig'];
    let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

    Promise.all(requests)
        .then(responses => {
            responses.forEach(response =>
                lg(`${response.url}: ${response.status}`))
            return responses;
        })
        // map array of responses into an array of response.json() to read their content
        .then(responses => Promise.all(responses.map(r => r.json())))
        // all JSON answers are parsed: "users" is the array of them
        .then(users => users.forEach(user => lg(user.login)));
}

{
    // all or nothing, N or 0
    Promise.all([
        new Promise((resolve, reject) => setTimeout(() => resolve("example#2_1"), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops")), 1000)),
        new Promise((resolve, reject) => setTimeout(() => resolve("example#2_3"), 1000))
    ])
        .then(lg);

    // Result : *ALL* promise ended, only "error" popped out
    // Uncaught (in promise) Error: Whoops
    // at TN_Callback_Advanced.js:50
}

//////////////////////////////////////////////////////////////////
// Error won't pending other promises
// fetch will pop out
//////////////////////////////////////////////////////////////////
{
    let urls = [
        'https://api.github.com/users/iliakan',
        'https://api.github.com/users/remy',
        'https://no-such-url'
    ];

    Promise.allSettled(urls.map(url => fetch(url))) // GET https://no-such-url/  net::ERR_NAME_NOT_RESOLVED
        .then(results => { // (*)
            results.forEach((result, num) => {
                if (result.status == "fulfilled") {
                    lg(`${urls[num]}: ${result.value.status}`);
                }
                if (result.status == "rejected") {
                    lg(`${urls[num]}: ${result.reason}`); // TypeError: Failed to fetch
                }
            });
        });
}

//////////////////////////////////////////////////////////////////
// Polyfill "allSettled"
//////////////////////////////////////////////////////////////////
if (!Promise.allSettled) {
    Promise.allSettled = function (promises) {
        return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
            state: "fullfilled",
            value
        }), reason => ({
            state: "rejected",
            reason
        })
        )));
    };
}

//////////////////////////////////////////////////////////////////
// wait for first to "win" the race
//////////////////////////////////////////////////////////////////
{
    Promise.race([
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
    ]).then(lg); // 1    
}

//////////////////////////////////////////////////////////////////
// Promise resolve / reject
// async / await
//////////////////////////////////////////////////////////////////
