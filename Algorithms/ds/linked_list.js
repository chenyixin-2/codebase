"use strict"

class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
};

class SingleLinkedList {
    constructor() {
        this.head = null;
    }
};

SingleLinkedList.prototype.printAll = function () {
    let pointer = this.head;
    let dataArray = [];
    while (pointer) {
        dataArray.push(pointer.data);
        pointer = pointer.next;
    }
    console.log(dataArray.join(","));
}

SingleLinkedList.prototype.insertAtBeginning = function (data) {
    let newNode = new Node(data);
    newNode.next = this.head; // remember the old one
    this.head = newNode; // reset heawd to new one
    return this.head;
}

SingleLinkedList.prototype.insertAtEnd = function (data) {
    let newNode = new Node(data);

    if (!this.head) {
        this.head = newNode;
        return this.head;
    }

    // else, tranverse the whole list
    let tail = this.head;
    while (tail.next !== null) {
        tail = tail.next;
    }
    tail.next = newNode;

    return this.head;
}

SingleLinkedList.prototype.getAt = function (index) {
    let counter = 0;
    let node = this.head;

    while (node) {
        if (counter === index) {
            return node;
        }
        counter++;
        node = node.next;
    }
    return null;
}

// index : 0 ~ N
SingleLinkedList.prototype.insertAt = function (data, index) {
    if (!this.head) return;

    let newNode = new Node(data);
    let node = this.head;

    if (index === 0) {
        this.head = new Node(data, this.head);
        return;
    }

    const previous = this.getAt(index - 1);
    newNode = new Node(data);
    newNode.next = previous.next;
    previous.next = newNode;

    return this.head;
    // let counter = 0;
    // while (node) {
    //     if (counter === index) {
    //         newNode.next = node;

    //     }
    // }
}

let UnionLists = function (l1, l2) {
    if (!l1.head || !l2.head) return;

    let p1 = l1.head;
    let p2 = l2.head;

    let union = [];
    while (p1 != null && p2 != null) {
        if (p1.data < p2.data) {
            union.push(p1.data);
            p1 = p1.next;
        } else if (p1.data > p2.data) {
            union.push(p2.data);
            p2 = p2.next;
        } else {
            union.push(p1.data);
            p2 = p2.next;
            p1 = p1.next;
        }
    }
    while (p1 != null) {
        union.push(p1.data);
        p1 = p1.next;
    }
    while (p2 != null) {
        union.push(p2.data);
        p2 = p2.next;
    }
    return union;
}

let IntersectList = function (l1, l2) {
    if (!l1.head || !l2.head) return;

    let p1 = l1.head;
    let p2 = l2.head;

    let intersect = [];
    while (p1 != null && p2 != null) {
        if (p1.data < p2.data) {
            p1 = p1.next;
        } else if (p1.data > p2.data) {
            p2 = p2.next;
        } else {
            intersect.push(p1.data);
            p2 = p2.next;
            p1 = p1.next;
        }
    }
    return intersect;
}

let CreateList = function (dataArray) {

    let newList = new SingleLinkedList();
    for (let dt of dataArray) {
        newList.insertAtEnd(dt);
    }
    return newList;
}