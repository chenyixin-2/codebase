// Move.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

int main()
{
	using namespace std;

	std::string str = "Hello";
	std::vector<std::string> v;

	v.push_back(str);
	cout << "After copy, str is " << str << "\n";

	cout << &str << endl;
	cout << &v[0] << endl;

	// 解决拷贝大数组的问题
	v.push_back(std::move(str));
	std::cout << "After move, str is " << str << "\n";

	cout << &str << endl;
	cout << &v[0] << endl;
	cout << &v[1] << endl;

	for_each(v.begin(), v.end(), [](const auto& el) {
		cout << el << endl;
		});

	std::string str1 = "test";
	auto str2 = std::move(str1);
	cout << "str1 " << str1 << endl;
	cout << "str2 " << str2 << endl;
	str1 = "after move";
	cout << str1 << endl;
}
