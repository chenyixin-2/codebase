#include <iostream>
using namespace std;

#include <array>

int main() {
	int fo[5];
	int foo[5] = {16 , 2, 77, 40, 12071};
	int baz[5] = {};
	int barz[5] = { 10, 20, 30 };
	int bar[5]{ 10, 20, 30 };

	std::cout << bar;

	// build in array vs container library array
	array<int, 3> myarray{ 10, 20, 30 };
	for (int i = 0; i < myarray.size(); ++i) {
		++myarray[i];
	}
	for (int elem : myarray)
		cout << elem << '\n';
}