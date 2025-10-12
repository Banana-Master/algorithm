#include <iostream>
using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);
	cout.tie(NULL);

	int N;
	cin >> N;
	int count = 1;
	int startIdx = 1;
	int endIdx = 1;
	int sum = 1;

	while (endIdx != N) {
		if (sum == N) {
			count++;
			endIdx++;
			sum += endIdx;
		}
		else if (sum > N) {
			sum -= startIdx;
			startIdx++;
		}
		else {
			endIdx++;
			sum += endIdx;
		}
	}

	cout << count << "\n";

	return 0;
}