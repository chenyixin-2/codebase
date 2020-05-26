// 677_MapSums.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>

#include <string>
#include <tuple>
#include <stack>

using namespace std;

class TrieNode {
public:
	TrieNode* children[26];
	bool isWord;
	int data;
	TrieNode() {
		::memset(children, 0, sizeof(children));
		isWord = false;
		data = 0;
	}

};

class MapSum {
private:
	TrieNode* root = new TrieNode();
	static const string all;

private:

	void _DFS_recursive(TrieNode* p, int& sum) {
		if (p->isWord) {
			sum += p->data;
		}
		for (auto c : MapSum::all) {
			auto pChild = p->children[c - 'a'];
			if (pChild != NULL) {
				_DFS_recursive(pChild, sum);
			}
		}
	}

	void _DFS_nonrecursive(TrieNode* p, int& sum) {

		stack<tuple<TrieNode*, char>> path;
		auto pParentNodeToExplore = p;
		auto chChildNodeToExplore = 'a';
		path.push(make_tuple(pParentNodeToExplore, chChildNodeToExplore));

		while (path.size() > 0) {
			auto t = path.top();
			auto pTemp = get<0>(t);
			auto chTemp = get<1>(t);

			//if (pTemp->children[chTemp - 'a'] && pTemp->children[chTemp - 'a']->isWord) {
			//	sum += pTemp->children[chTemp - 'a']->data;
			//}

			for (auto c = chTemp; c <= 'z'; ++c) {
				auto pChild = pTemp->children[c - 'a'];
				if (pChild != NULL) {
					get<1>(path.top()) = c; // update the child index for next search
					path.push(make_tuple(pChild, 'a')); // update next level search
					break;
				}
				else if (c == 'z') {

					if (pTemp->isWord) {
						sum += pTemp->data; // 只有在 pop 的时候，才计算sum，避免同一个节点的重复计算。
					}

					path.pop(); // current level is out of time

					if (path.size() > 0) { // move to next node "in case" of 
						auto& chTop = get<1>(path.top());
						chTop = chTop + 1 > 'z' ? 'z' : chTop + 1;
					}
				}
			}
		}
	}

public:
	/** Initialize your data structure here. */
	MapSum() {

	}

	void insert(string key, int val) {
		TrieNode* p = root;
		for (auto w : key) {
			if (p->children[w - 'a'] == NULL) p->children[w - 'a'] = new TrieNode;
			p = p->children[w - 'a'];
		}
		p->data = val;
		p->isWord = true;
	}

	int sum(string prefix) {
		TrieNode* p = root;

		for (auto w : prefix) {
			if (p->children[w - 'a'] == NULL) return 0;
			p = p->children[w - 'a'];
		}

		// do dfs search
		// p is the root of all prefix
		int sum = 0;
		//_DFS_recursive(p, sum);
		_DFS_nonrecursive(p, sum);

		return sum;
	}
};

const string MapSum::all = "abcdefghijklmnopqrstuvwxyz";

int main()
{
	MapSum ms;
	ms.insert("apple", 3);
	cout << ms.sum("ap");
	ms.insert("app", 2);
	cout << ms.sum("ap");
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
