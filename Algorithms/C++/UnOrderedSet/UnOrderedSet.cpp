// UnOrderedSet.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <set>
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
	vector<int> powerfulIntegers(int x, int y, int bound) {
		using namespace std;
		set<string> ind_pair;
		set<int> values;

		int max = 1;
		int bd = bound;
		while (max <= 100) {
			int bFirstCheck = true;

			for (int i = 0; i < max && pow(x, i) <= bd; ++i) {
				for (int j = 0; j < max && pow(y, j) <= bd; ++j) {

					if (ind_pair.find(to_string(i) + to_string(j)) == ind_pair.end()) {
						int val = pow(x, i) + pow(y, j);
						if (val <= bd) {
							values.insert(val);
						}
					}
				}
			}
			max++;
		}

		std::vector<int> res;
		res.reserve(values.size());
		for (auto e : values) {
			res.push_back(e);
		}
		return std::move(res);
	}
};

int main()
{
	Solution s;
	for (auto e : s.powerfulIntegers(2, 3, 10)) {
		std::cout << e << " ";
	}
	cout << endl;
	for (auto e : s.powerfulIntegers(3, 5, 15)) {
		std::cout << e << " ";
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
