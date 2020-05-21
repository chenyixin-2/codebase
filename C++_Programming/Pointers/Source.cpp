#include <iostream>
using namespace std;

// pointers as arguments
void increment_all(int* start, int* stop) {
	int* current = start;
	while (current != stop) {
		++(*current);
		++current;
	}
}

void print_all(const int* start, const int* stop) {
	const int* current = start;
	while (current != stop) {
		cout << *current << '\n';
		++current;
	}
}

void increase(void* data, int psize) {
	if (psize == sizeof(char)) {
		char* pchar;
		pchar = (char*)data;
		++(*pchar);
	}
}

int main() {
	// delcare of pointers
	int* p1;

	// access address of different pointers
	int numbers[5];
	int* p;
	p = numbers;
	*p = 10;
	p++;			// get address by ++
	*p = 20;
	p = &numbers[2]; // get array member addess
	*p = 30;
	p = numbers + 3; // get array address offset(3)
	*p = 40;
	p = numbers;
	*(p + 4) = 50; // get address by arithmetic offset

	for (int n = 0; n < 5; n++) {
		cout << numbers[n] << ", ";
	}
	cout << "\n";

	// different types of arithmetic
	char* mychar = new char[0];
	short* myshort = new short[0];
	long* mylong = new long[0];

	cout << "mychar" << &mychar << "\n";
	mychar++;
	cout << "mychar" << &mychar << "\n";

	cout << "myshort" << &myshort << "\n";
	myshort++;
	cout << "myshort" << &myshort << "\n";

	cout << "mylong" << &mylong << "\n";
	mylong++;
	cout << "mylong" << &mylong << "\n";

	// pointers and const
	int x = 5;
	int y = 10;
	const int* pp = &y;
	x = *pp;
	//*pp = x; // error : *p is const
	// c3892 
	//

	// pointers as arguments
	increment_all(numbers, numbers + 3);
	print_all(numbers, numbers + 3);

	// const pointers and const values
	const int* p2 = &x; // non-const pointer to const int variable : pointer : modifyable, variable : const  ||| const describe "int* p2", which is a value
	int* const p3 = &x; // const pointer to non-const int variable const describe "p3", which is a vaible 
	const int* const p4 = &x;

	// string literals : const pointers
	const char* foo = "hello";

	// pointer to pointer
	// address in memory
	char a;
	char* b;
	char** c;
	a = 'z';
	b = &a;
	c = &b;

	// void pointers


	return 0;
}