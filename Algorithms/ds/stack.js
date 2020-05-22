const LinkedList = require('./linked_list');

module.exports = class Stack {
    constructor() {
        this.linkedList = new LinkedList();
    }
    /**
    * @return {boolean}
    */
    isEmpty() {
        return !this.linkedList.head;
    }
    /**
    * @return {*}
    */
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.linkedList.head.value;
    }
    /**
      * @param {*} value
      */
    push(value) {
        // Pushing means to lay the value on top of the stack. Therefore let's just add
        // the new value at the start of the linked list.
        this.linkedList.prepend(value);
    }

    /**
     * @return {*}
     */
    pop() {
        // Let's try to delete the first node (the head) from the linked list.
        // If there is no head (the linked list is empty) just return null.
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }
    /**
    * @return {*[]}
    */
    toArray() {
        return this.linkedList
            .toArray()
            .map(linkedListNode => linkedListNode.value);
    }
    /**
    * @param {function} [callback]
    * @return {string}
    */
    toString(callback) {
        return this.linkedList.toString(callback);
    }
}