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

function bubbleSort(arr) {
    for (let i = 1, len = arr.length; i < len - 1; ++i) {
        for (let j = 0; j <= len - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

function insertionSort(arr) {
    let n = arr.length;

    // a[0] had been sorted, index starts from 1
    for (let i = 1; i < n; i++) {
        // get next element
        for (let j = i - 1; j >= 0; j--) {
            if (arr[i] >= arr[j]) {
                arr.splice(j + 1, 0, arr.splice(i, 1)[0]);
                break;
            } else if (j === 0) {
                arr.splice(j, 0, arr.splice(i, 1)[0]);
            }
        }
    }
    return arr;
}

function qSort(arr) {
    let left = [], right = [];

    let base = arr[0];

    if (arr.length <= 1) return arr;

    for (let i = 1, len = arr.length; i < len; i++) {
        if (arr[i] < base) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...qSort(left), ...[base], ...qSort(right)];
}

// lg(qSort([10, 2, 7, 4, 8]));

// DFS
function DFS(node) {
    let nodeList = [];
    if (node) {
        let stack = [];
        stack.push(node);
        while (stack.length != 0) {
            let item = stack.pop();
            nodeList.push(item);

            let children = item.children;
            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }

        return nodeList;
    }
}

function DFS_recursion(node, nodeList) {
    if (node) {
        nodeList.push(node);
        let children = node.children;
        for (let i = 0; i < children.length; i++) {
            DFS(children[i], nodeList);
        }
    }
}

//////////////////////////////////////////////////////////////////
// do something
//////////////////////////////////////////////////////////////////
function doSomething(node) {
    lg(node);
}

function makeDoSomethingForGraph(doSomething) {
    let nodeList = [];

    function f(arguments) {
        nodeList.push(arguments);
        doSomething(arguments);
        return f;  // <----------------------------- not 
    }

    f.toString = () => {
        return nodeList.join(',');
    }

    return f;
}

let doSomething_algo = makeDoSomethingForGraph((node) => lg(node));

function BFS(node, doSomething) {
    let nodeList = [];

    if (node != null) {
        let queue = [];
        queue.unshift(node); // push first
        while (queue.length != 0) {
            let item = queue.shift(); // pop first

            // nodeList.push(item); // <----------------------------- do something to the node
            doSomething_algo(item);

            let children = item.children;
            for (let i = 0; i < children.length; i++) {
                queue.push(children[i]);
            }
        }
    }
    return nodeList;
}

{
    // let i = 0;
    let nodeList = [];
    function BFS_Recursion(node, nodeList, i) {
        if (node) {

            // nodeList.push(node); // <----------------------------- do something to the node
            doSomething_algo(node);

            if (nodeList.length > 1) {
                BFS_Recursion(node.nextElementSibling, nodeList, i); // <----------------------------- search the node's sibling
            }

            node = nodeList[i++];   // <----------------------------- search node's first child
            BFS_Recursion(node.firstElementChild, nodeList, i);
        }
        return nodeList;
    }
}
