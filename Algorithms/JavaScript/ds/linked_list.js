const LinkedListNode = require('../ds/linked_list_node')
const Comparartor = require('../ds/utils/comparator/Comparator')

module.exports = class LinkedList {
    /**
     * @param {function} [comparatorFunction]
     */
    constructor(comparatorFunction) {
        this.head = null;
        this.tail = null;

        this.compare = new Comparartor(comparatorFunction);
    }

    /**
    * @param {*} value
    * @return {LinkedList}
    */
    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    /**
    * @param {*} value
    * @return {LinkedList}
    */
    append(value) {
        const newNode = new LinkedListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    /**
    * @param {*} value
    * @return {LinkedListNode}
    */
    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;

        // If the head must be deleted then make next node that is differ
        // from the head to be a new head.
        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            // If next node must be deleted then make next node to be a next next one.
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Check if tail must be deleted.
        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }
        return null;
    }

    /**
 * @return {LinkedListNode}
 */
    deleteHead() {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
    * @return {LinkedListNode}
    */
    deleteTail() {
        const deletedTail = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deletedTail
        }

        let currentNode = this.head;
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;
        return deletedTail;
    }

    /**
    * @param {*[]} values - Array of values that need to be converted to linked list.
    * @return {LinkedList}
    */
    fromArray(values) {
        values.forEach(value => this.append(value));
        return this;
    }

    /**
    * @return {LinkedListNode[]}
    */
    toArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
    * @param {function} [callback]
    * @return {string}
    */
    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    /**
    * Reverse a linked list.
    * @returns {LinkedList}
    */
    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            // store next node
            nextNode = currNode.next;

            // change the next node of the current node so it would link to previous node
            currNode.next = prevNode;
            // move prevNode and currNode nodes one step further
            prevNode = currNode;
            currNode = nextNode;
        }
        this.tail = this.head;
        this.head = prevNode; // prevNode is "tail" at last iteration
    }
}
