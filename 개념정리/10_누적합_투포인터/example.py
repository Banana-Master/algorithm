from collections import Counter


# 1) 1차원 누적합: S[i] = arr[0] + ... + arr[i-1]
def prefix_sum(arr):
    s = [0] * (len(arr) + 1)
    for i, x in enumerate(arr):
        s[i + 1] = s[i] + x
    return s


# 2) 2차원 누적합 (백준 11660): 1-indexed 좌표 (x1,y1)~(x2,y2) 구간 합
def prefix_sum_2d(grid):
    n, m = len(grid), len(grid[0])
    s = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + grid[i - 1][j - 1]
    return s


def range_sum_2d(s, x1, y1, x2, y2):
    return s[x2][y2] - s[x1 - 1][y2] - s[x2][y1 - 1] + s[x1 - 1][y1 - 1]


# 3) 나머지 합 (백준 10986): 연속 구간 합이 m으로 나누어떨어지는 구간 개수
#    S[j] % m == S[i] % m 인 (i, j) 쌍의 개수와 같다
def mod_sum_count(arr, m):
    count = Counter()
    total = 0
    count[0] = 1  # S[0] = 0
    answer = 0
    for x in arr:
        total = (total + x) % m
        answer += count[total]  # 앞에서 같은 나머지가 나온 횟수만큼 구간이 생김
        count[total] += 1
    return answer


# 4) 같은 방향 투 포인터 (백준 2018 수들의 합 5): 연속된 자연수의 합으로 n을 만드는 방법 수
def consecutive_sum_ways(n):
    start = end = 1
    total = 1
    count = 0
    while start <= n:
        if total == n:
            count += 1
        if total < n:
            end += 1
            total += end    # 구간 늘리기
        else:
            total -= start  # 구간 줄이기
            start += 1
    return count


# 5) 양 끝 투 포인터 (백준 1940 주몽): 정렬된 배열에서 합이 target인 쌍의 개수
def pair_count(arr, target):
    arr = sorted(arr)
    left, right = 0, len(arr) - 1
    count = 0
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            count += 1
            left += 1
            right -= 1
        elif s < target:
            left += 1
        else:
            right -= 1
    return count


# 6) 슬라이딩 윈도우 (백준 2559 수열): 길이 k 구간 합의 최댓값
def max_window_sum(arr, k):
    window = sum(arr[:k])
    best = window
    for i in range(k, len(arr)):
        window += arr[i] - arr[i - k]  # 들어온 값 더하고, 빠진 값 빼기
        best = max(best, window)
    return best


if __name__ == '__main__':
    s = prefix_sum([5, 4, 3, 2, 1])
    print(s)            # [0, 5, 9, 12, 14, 15]
    print(s[4] - s[1])  # 9  (arr[1] ~ arr[3])

    s2 = prefix_sum_2d([[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7]])
    print(range_sum_2d(s2, 2, 2, 3, 4))  # 27

    print(mod_sum_count([1, 2, 3, 1, 2], 3))  # 7
    print(consecutive_sum_ways(15))             # 4  (15, 7+8, 4+5+6, 1+2+3+4+5)
    print(pair_count([2, 7, 4, 1, 5, 3], 9))    # 2  (2+7, 4+5)
    print(max_window_sum([3, -2, -4, -9, 0, 3, 7, 13, 8, -3], 2))  # 21
