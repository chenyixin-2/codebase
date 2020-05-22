import LinkedListNode from './linked_list_node';
import Comparartor from '../ds/utils/comparator/Comparator';

export default class LinkedList {
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

        // this.head is the special case
        // if head is the one to delete, then delete it.
        let deleteNode = null;
        while (this.head && this.compare.equal(this.head.value, value)) {
            deleteNode = this.head;
            this.head = this.head.next;
        }

        // delete other node
        let currentNode = this.head;
        if (currentNode.next) {
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // tail is the special case
        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deleteNode;
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