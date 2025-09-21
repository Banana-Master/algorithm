#include <iostream>

int main() {
    int user_count;
    std::cin >> user_count;
    int user_weight[user_count];
    int user_height[user_count];
    int ranks[user_count];

    for (int i = 0; i < user_count; i++) {
        std::cin >> user_weight[i] >> user_height[i];
    }

    for (int i = 0; i < user_count; i++) {
        int rank = 1;
        for (int j = 0; j < user_count; j++) {
            if (user_weight[j] > user_weight[i] && user_height[j] > user_height[i]) {
                rank++;
            }
        }
        ranks[i] = rank;
    }

    for (int i = 0; i < user_count; i++) {
        std::cout << ranks[i] << " ";
    }
    std::cout << "\n";

    return 0;
}