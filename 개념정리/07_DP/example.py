from functools import cache


# 1) 피보나치: Top-down (메모이제이션)
@cache
def fib_memo(n):
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)


# 1) 피보나치: Bottom-up (테이블)
def fib_table(n):
    dp = [0] * (n + 1)
    if n >= 1:
        dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]


# 2) 1로 만들기 (백준 1463)
#    dp[i] = i를 1로 만드는 최소 연산 횟수 (연산: -1, /2, /3)
def make_one(n):
    dp = [0] * (n + 1)
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + 1
        if i % 2 == 0:
            dp[i] = min(dp[i], dp[i // 2] + 1)
        if i % 3 == 0:
            dp[i] = min(dp[i], dp[i // 3] + 1)
    return dp[n]


# 3) 정수 삼각형 (프로그래머스 43105): 위에서 아래로 내려가며 합의 최댓값
def triangle_max(triangle):
    dp = [row[:] for row in triangle]
    for i in range(1, len(dp)):
        for j in range(len(dp[i])):
            left = dp[i - 1][j - 1] if j > 0 else 0
            right = dp[i - 1][j] if j < i else 0
            dp[i][j] += max(left, right)
    return max(dp[-1])


# 4) 0/1 배낭 (백준 12865): 무게 한도 k 안에서 가치 합의 최댓값
#    dp[w] = 무게 합이 w 이하일 때 최대 가치
def knapsack(items, k):
    dp = [0] * (k + 1)
    for weight, value in items:
        # 큰 무게부터 거꾸로! (작은 쪽부터 하면 같은 물건을 여러 번 담게 됨)
        for w in range(k, weight - 1, -1):
            dp[w] = max(dp[w], dp[w - weight] + value)
    return dp[k]


# 5) LIS: 가장 긴 증가하는 부분 수열의 길이 (O(N^2))
#    dp[i] = i번째 원소로 끝나는 증가 부분 수열의 최대 길이
def lis(nums):
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)


if __name__ == '__main__':
    print(fib_memo(50), fib_table(50))  # 12586269025 12586269025
    print(make_one(10))                 # 3  (10 -> 9 -> 3 -> 1)
    print(triangle_max([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]))  # 30
    print(knapsack([(6, 13), (4, 8), (3, 6), (5, 12)], 7))  # 14
    print(lis([10, 20, 10, 30, 20, 50]))  # 4  (10, 20, 30, 50)
