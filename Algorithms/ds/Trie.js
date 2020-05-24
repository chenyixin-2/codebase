const TrieNode = require('./TrieNode');

const HEAD_CHARACTER = '*';

module.exports = class Trie {
    constructor() {
        this.head = new TrieNode(HEAD_CHARACTER);
    }

    /**
    * @param {string} word
    * @return {Trie}
    */
    addWord(word) {
        const characters = Array.from(word);
        let currentNode = this.head;

        for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
            const isComplete = charIndex === characters.length - 1;
            currentNode = currentNode.addChild(characters[charIndex], isComplete);
        }

        return this;
    }

    /**
    * @param {string} word
    * @return {Trie}
    */
    deleteWord(word) {
        const depthFirstDelete = (currentNode, charIndex = 0) => {
            if (charIndex >= word.length) {
                // return if we're trying to delete the character that is out of word's scope
                return;
            }

            const character = word[charIndex];
            const nextNode = currentNode.getChild(character);

            if (nextNode == null) {
                return;
            }

            depthFirstDelete(nextNode, charIndex + 1);

            if (charIndex === (word.length - 1)) {
                nextNode.isCompleteWord = false;
            }

            currentNode.removeChild(character);
        };

        depthFirstDelete(this.head);
        return this;
    }

    /**
     * @param {string} word
     * @return {string[]}
     */
    suggestNextCharacters(word) {
        const lastCharacter = this.getLastCharacterNode(word);

        if (!lastCharacter) {
            return null;
        }

        return lastCharacter.suggestChildren();
    }

    /**
     * Check if complete word exists in Trie.
     *
     * @param {string} word
     * @return {boolean}
     */
    doesWordExist(word) {
        const lastCharacter = this.getLastCharacterNode(word);

        return !!lastCharacter && lastCharacter.isCompleteWord;
    }

    /**
    * @param {string} word
    * @return {TrieNode}
     */
    getLastCharacterNode(word) {
        const characters = Array.from(word);
        let currentNode = this.head;

        for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
            if (!currentNode.hasChild(characters[charIndex])) {
                return null;
            }

            currentNode = currentNode.getChild(characters[charIndex]);
        }

        return currentNode;
    }
}