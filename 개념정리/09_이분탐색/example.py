from bisect import bisect_left, bisect_right


# 1) 기본 이분 탐색: 값의 인덱스 (없으면 -1)
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1


# 2) lower_bound 직접 구현: target 이상이 처음 나오는 위치
def lower_bound(arr, target):
    lo, hi = 0, len(arr)  # hi = len(arr): 전부 target보다 작으면 len(arr) 반환
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo


# 3) 파라메트릭 서치 템플릿: 조건을 만족하는 "최솟값"
#    입국심사 (프로그래머스 43238): n명을 심사하는 데 필요한 최소 시간
def immigration(n, times):
    def can_finish(t):  # t분 안에 n명 이상 심사할 수 있는가?
        return sum(t // time for time in times) >= n

    lo, hi = 1, max(times) * n
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(mid):
            hi = mid      # 가능 → 더 작은 값도 가능한지 왼쪽 탐색
        else:
            lo = mid + 1  # 불가능 → 오른쪽
    return lo


# 4) 파라메트릭 서치 템플릿: 조건을 만족하는 "최댓값"
#    나무 자르기 (백준 2805): 적어도 m미터를 얻을 수 있는 절단기 높이의 최댓값
def cut_trees(trees, m):
    def enough(h):  # 높이 h로 자르면 m미터 이상인가?
        return sum(t - h for t in trees if t > h) >= m

    lo, hi = 0, max(trees)
    while lo < hi:
        mid = (lo + hi + 1) // 2  # 최댓값을 찾을 때는 +1 (안 하면 무한 루프)
        if enough(mid):
            lo = mid      # 가능 → 더 높여 본다
        else:
            hi = mid - 1
    return lo


if __name__ == '__main__':
    arr = [1, 3, 5, 7, 9, 11, 13]
    print(binary_search(arr, 11))  # 5
    print(binary_search(arr, 4))   # -1

    nums = [1, 2, 2, 2, 3, 5]
    print(lower_bound(nums, 2), bisect_left(nums, 2))  # 1 1
    print(bisect_right(nums, 2) - bisect_left(nums, 2))  # 3  (2의 개수)

    print(immigration(6, [7, 10]))        # 28
    print(cut_trees([20, 15, 10, 17], 7))  # 15
