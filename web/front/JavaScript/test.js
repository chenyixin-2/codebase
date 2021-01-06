lg(GetScriptName());

// this function
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

lg("List node");
lg(new ListNode());

function CreateList(dataArray) {
    let p = null;
    let res = null;

    for (let d of dataArray) {
        let n = new ListNode(d, null);
        if (p == null) {
            p = n;
            res = p;
        } else {
            p.next = n;
            p = p.next;
        }
    }
    return res;
}

var addTwoNumbers = function (l1, l2) {
    let pL1 = l1;
    let pL2 = l2;
    let pSum = null;

    let jinwei = false;

    while (pL1 != null || pL2 != null || jinwei == true) {
        if (pL1 == null) {
            pL1 = new ListNode(0, null);
        }
        if (pL2 == null) {
            pL2 = new ListNode(0, null);
        }

        let sum = pL1.val + pL2.val + (jinwei ? 1 : 0);
        if (sum < 10) {
            jinwei = false;
        } else {
            jinwei = true;
            sum = sum - 10;
        }

        if (pSum != null) {
            let pSumLast = pSum;
            while (pSumLast.next != null) {
                pSumLast = pSumLast.next;
            }
            pSumLast.next = new ListNode(sum, null);
        } else {
            pSum = new ListNode(sum, null);
        }


        if (pL2 != null) pL2 = pL2.next;
        if (pL1 != null) pL1 = pL1.next;
    }
    return pSum;
}

var removeNthFromEnd = function (head, n) {

    // if(head.next == null && n == 1) return null;

    let pPrior = new ListNode(NaN, head);
    let pLast = new ListNode(NaN, head);

    let count = 0;
    while (count < n + 1 && pLast != null) {
        pLast = pLast.next;
        count++;
    }

    if (count != n + 1) {
        return null;
    }

    while (pLast != null) {
        pLast = pLast.next;
        pPrior = pPrior.next;
    }
    pPrior.next = pPrior.next.next;

    if (isNaN(pPrior.val)) {
        head = pPrior.next;
    }

    return head;
};

var mergeTwoLists = function (l1, l2) {
    let p1 = l1;
    let p2 = l2;
    let pResult = new ListNode(-1, null); // create a head node
    let pLast = pResult;

    while (p1 != null && p2 != null) {
        if (p1.val < p2.val) {
            pLast.next = new ListNode(p1.val, null);
            pLast = pLast.next;
            p1 = p1.next;
        } else if (p2.val < p1.val) {
            pLast.next = new ListNode(p2.val, null);
            pLast = pLast.next;
            p2 = p2.next;
        } else if (p1.val == p2.val) {
            pLast.next = new ListNode(p1.val, null);
            pLast = pLast.next;
            pLast.next = new ListNode(p2.val, null);
            pLast = pLast.next;
            p1 = p1.next;
            p2 = p2.next;
        }
    }
    if (p1 == null) {
        while (p2 != null) {
            pLast.next = new ListNode(p2.val, null);
            pLast = pLast.next;
            p2 = p2.next;
        }
    } else if (p2 == null) {
        while (p1 != null) {
            pLast.next = new ListNode(p1.val, null);
            pLast = pLast.next;
            p1 = p1.next;
        }
    };

    pResult = pResult.next; // remove the head node
    return pResult;
}

// Input : (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output : 7 -> 0 -> 8 
let l1 = CreateList([2, 4, 3]);
let l2 = CreateList([5, 6, 4]);
let sum1 = addTwoNumbers(l1, l2);
lg(sum1);

// Input : (2 -> 4 -> 3) + (8 -> 6)
// Output : 0 -> 1 -> 4
let l3 = CreateList([2, 4, 3]);
let l4 = CreateList([8, 6]);
let sum2 = addTwoNumbers(l3, l4);
lg(sum2);

lg("----------------------------- removeNthFromEnd -----------------------------")
let l5 = CreateList([1, 2, 3, 4, 5]);
lg(removeNthFromEnd(l5, 2));

var mergeKLists = function (lists) {
    var pLists = [];

    for (let list of lists) {
        let pList = list;
        pLists.push(pList);
    }

    let pResult = new ListNode(-1, null); // create a head node
    let pLast = pResult;

    const INVALID_MIN = Number.MAX_SAFE_INTEGER;
    const INVALID_IDX = -1;

    let minVal = INVALID_MIN;
    let minIdx = INVALID_IDX;

    while (1) {
        // scan for the whole lists
        for (let i = 0; i < pLists.length; ++i) {
            if (pLists[i] == null) continue;

            let val = pLists[i].val;
            if (val < minVal) {
                minVal = val;
                minIdx = i;
            }
        }
        // find or not
        if (minIdx == INVALID_IDX) {
            break;
        } else {
            pLast.next = new ListNode(minVal, null);
            pLast = pLast.next;
            pLists[minIdx] = pLists[minIdx].next;
        }
        minVal = INVALID_MIN;
        minIdx = INVALID_IDX;
    }

    pResult = pResult.next; // remove the head node
    return pResult;
};

// [] | 0,
// [] | 1, 2

// [1] | 0, ok 
// [1] | 1, 2 wrong

// [1,2] | 0
// [1,2] | 0, 1
// [1,2] | 1, 2

let l6 = CreateList([1]);
lg(removeNthFromEnd(l6, 1));

let l7 = CreateList([1, 2]);
lg(removeNthFromEnd(l7, 1));

let l8 = CreateList([1, 2]);
lg(removeNthFromEnd(l8, 2));

let l9 = CreateList([1, 2, 3, 4, 5]);
lg(removeNthFromEnd(l9, 4));

let l10 = CreateList([1, 2, 3, 4, 5]);
lg(removeNthFromEnd(l10, 5));

let l11 = CreateList([1, 2, 3, 4, 5]);
lg(removeNthFromEnd(l10, 6));

let l12 = CreateList([1, 2, 4]);
let l13 = CreateList([1, 3, 4]);
lg(mergeTwoLists(l12, l13));

let mp = {};
mp["test"] = "test";
lg(mp)
lg(mp["check"])

if (mp["check"] == undefined) {
    lg("haha");    
}

console.log(typeof(mp))