#include <iostream>

int main() {
    double a, b;

    std::cin >> a >> b;
    
    std::fixed;
	std::cout.precision(12);

    std::cout << a / b;

    return 0;
}