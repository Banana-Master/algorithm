from itertools import permutations, combinations, product


# 1) 재귀로 순열 직접 만들기 (백준 15649 N과 M (1))
def my_permutations(nums, r):
    result = []
    used = [False] * len(nums)
    path = []

    def backtrack():
        if len(path) == r:
            result.append(path[:])  # 복사본 저장!
            return
        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True          # 선택
            path.append(nums[i])
            backtrack()             # 다음 단계
            path.pop()              # 선택 취소 (원상복구)
            used[i] = False

    backtrack()
    return result


# 2) 재귀로 조합 직접 만들기: start 이후 원소만 고르면 순서 중복이 생기지 않음
def my_combinations(nums, r):
    result = []
    path = []

    def backtrack(start):
        if len(path) == r:
            result.append(path[:])
            return
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1)
            path.pop()

    backtrack(0)
    return result


# 3) 백트래킹 + 가지치기: N-Queen 배치 개수
def n_queen(n):
    cols = [False] * n
    diag1 = [False] * (2 * n)  # row + col 이 같은 대각선
    diag2 = [False] * (2 * n)  # row - col + n 이 같은 대각선
    count = 0

    def place(row):
        nonlocal count
        if row == n:
            count += 1
            return
        for col in range(n):
            # 공격받는 칸이면 더 들어가지 않음 (가지치기)
            if cols[col] or diag1[row + col] or diag2[row - col + n]:
                continue
            cols[col] = diag1[row + col] = diag2[row - col + n] = True
            place(row + 1)
            cols[col] = diag1[row + col] = diag2[row - col + n] = False

    place(0)
    return count


if __name__ == '__main__':
    print(my_permutations([1, 2, 3], 2))   # [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]]
    print(my_combinations([1, 2, 3, 4], 2))  # [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
    print(n_queen(8))                      # 92

    # 라이브러리 사용 (Python)
    print(list(permutations([1, 2, 3], 2)))  # 순열: 6개
    print(list(combinations([1, 2, 3], 2)))  # 조합: [(1, 2), (1, 3), (2, 3)]
    print(len(list(product('AEIOU', repeat=2))))  # 중복 순열: 25

    # 부분집합: 각 원소를 넣는다/안 넣는다 → 비트마스크로 2^N개
    nums = [1, 2, 3]
    subsets = [[nums[i] for i in range(3) if mask & (1 << i)] for mask in range(1 << 3)]
    print(subsets)  # [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
