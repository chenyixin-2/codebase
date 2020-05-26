// Trie.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <string>

class TrieNode {
public:
	TrieNode* children[26];
	bool isWord;
	TrieNode() {
		::memset(children, 0, sizeof(children));
		isWord = false;
	}

};

using namespace std;

class Trie {
private:
	TrieNode *root = new TrieNode();

public:

	Trie() {
	}

	void Insert(string word) {
		TrieNode* p = root;
		for (auto w : word) {
			if (p->children[w - 'a'] == NULL) p->children[w - 'a'] = new TrieNode;
			p = p->children[w - 'a'];
		}
		p->isWord = true;
	}

	bool Search(string word) {
		TrieNode* p = root;
		for (auto w : word) {
			if (p->children[w - 'a'] == NULL) return false;
			p = p->children[w - 'a'];
		}
		return p->isWord;
	}
	bool startWith(string prefix) {
		TrieNode* p = root;
		for (auto w : prefix) {
			if (p->children[w - 'a'] == NULL) return false;
			p = p->children[w - 'a'];
		}
		return true;
	}
};

int main()
{
	Trie t;
	t.Insert("aaa");
	t.Insert("bbb");
	t.Insert("abc");

	cout << t.startWith("a") << endl;
	cout << t.startWith("ab") << endl;
	cout << t.Search("a") << endl;
	cout << t.Search("bbb") << endl;
}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
