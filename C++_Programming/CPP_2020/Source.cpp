#include <iostream>
using namespace std;

template <class T, int N>
T fixed_multiply(T Val)
{
	return Val * N;
}

// namespace
namespace foo
{
	int value() { return 5; }
}

namespace bar
{
	const double pi = 3.1416;
	double value() { return 2 * pi; }
}

namespace first
{
	int x = 5;
	int y = 10;
}

namespace second
{
	double x = 3.1416;
	double y = 2.7183;
}

namespace second_alias = second;

int main() {

	// template
	std::cout << fixed_multiply<int, 2>(10) << '\n';
	std::cout << fixed_multiply<int, 3>(10) << '\n';

	// name visibility
	{
		int x = 10;
		int y = 20;
		{
			int x;
			x = 50;
			y = 50;
			cout << "inner block:\n";
			cout << "x: " << x << '\n';
			cout << "y: " << y << '\n';
		}
		cout << "outer block:\n";
		cout << "x: " << x << '\n';
		cout << "y: " << y << '\n';
	}

	// namespace
	cout << foo::value() << '\n';
	cout << bar::value() << '\n';
	cout << bar::pi << '\n';

	// using
	using first::x;
	using second::y;
	cout << x << '\n';  // first::x
	cout << y << '\n'; // second::y
	cout << first::y << '\n' ;
	cout << second::x << '\n';

	cout << second_alias::y << '\n';

	return 0;
}

