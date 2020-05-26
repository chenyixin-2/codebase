// 811_SubdomainVisitCount.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <string>
#include <vector>
#include <map>
using namespace std;

class TrieNode {
public:
	map<string, TrieNode*> children;
	int count;
};

class Trie {
private:
	TrieNode* root = new TrieNode();

public:
	void insert(string domain, int count) {
		auto p = root;

		while (domain != "") {

			// 1. get subdomain
			auto pos = domain.find_last_of('.');
			string subDomainToVisit = "";
			if (pos != string::npos) {
				subDomainToVisit = domain.substr(pos);
				domain.erase(pos);
			}
			else {
				subDomainToVisit = domain;
				domain = "";
			}

			// 2. visit subdomain
			if (p->children.find(subDomainToVisit) == p->children.end()) p->children[subDomainToVisit] = new TrieNode(); // create node
			p = p->children[subDomainToVisit]; // move forward
			p->count += count; // after visited, count is added
		}
		//p->count = count; // finally, we insert this line
	}

	// p : count + children 
	// we know subdomain in previous level
	void _dfs_search(TrieNode* p, vector<string>& path, map<string, int>& domainCntMap) {

		// 1.visit node
		// complete the whole world
		string completeDomain = "";
		for (auto it = path.rbegin(); it != path.rend(); ++it) {// count + path 
			completeDomain += *it;
		}
		if (completeDomain != "") {
			if (completeDomain[0] == '.') {
				completeDomain.erase(0, 1); // remove heading '.'
			}
			if (domainCntMap.find(completeDomain) == domainCntMap.end()) {
				domainCntMap[completeDomain] = 0;
			}
			domainCntMap[completeDomain] += p->count; // calculate the total sum
		}

		for (auto childNode : p->children) {
			if (childNode.second != NULL) {
				path.push_back(childNode.first); // before visit : subdomain name
				_dfs_search(childNode.second, path, domainCntMap); // dfs visit sub node
				path.pop_back(); // after visit 
			}
		}
	}

	vector<string> DFS_ListAll() {
		map<string, int> domainCntMap;
		vector<string> res;
		vector<string> path;

		_dfs_search(root, path, domainCntMap);

		for (auto domain_cnt : domainCntMap) {
			res.push_back(to_string(domain_cnt.second) + " " + domain_cnt.first);
		}

		return std::move(res);
	}
};

class Solution {
public:
	// cpdomains : 900 discuss.leetcode.com
	vector<string> subdomainVisits(vector<string>& cpdomains) {
		Trie t;
		for (auto domain : cpdomains) {
			auto pos = domain.find(' ');
			if (pos != string::npos) {
				auto count = stoi(domain.substr(0, pos));
				auto d = domain.substr(pos + 1);
				t.insert(d, count);
			}
		}

		return t.DFS_ListAll();
	}
};

int main()
{
	Solution s;
	vector<string> input;
	input.push_back("9001 discuss.leetcode.com");
	for (auto e : s.subdomainVisits(input)) {
		cout << e << " ";
	}

	input.clear();

	for (auto e : { "900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org" }) {
		input.push_back(e);
	}
	for (auto e : s.subdomainVisits(input)) {
		cout << e << " ";
	}
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
