from collections import Counter, defaultdict


# 1) 개수 세기: 완주하지 못한 선수 (participant 중 completion에 없는 1명)
def not_completed(participant, completion):
    count = Counter(participant)
    count.subtract(completion)
    for name, c in count.items():
        if c > 0:
            return name


# 2) Two Sum: 합이 target인 두 수의 인덱스 (지금까지 본 값을 해시에 저장)
def two_sum(nums, target):
    seen = {}  # 값 -> 인덱스
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
    return []


# 3) 그룹 묶기: 종류별 개수로 조합 수 계산 (의상 문제)
def clothes_combinations(clothes):
    by_kind = defaultdict(int)
    for _, kind in clothes:
        by_kind[kind] += 1
    answer = 1
    for c in by_kind.values():
        answer *= c + 1  # 해당 종류를 안 입는 경우 +1
    return answer - 1    # 아무것도 안 입는 경우 제외


if __name__ == '__main__':
    print(not_completed(['leo', 'kiki', 'eden'], ['eden', 'kiki']))  # leo
    print(two_sum([2, 7, 11, 15], 9))                                 # [0, 1]
    print(clothes_combinations([['hat', 'head'], ['sunglasses', 'eye'], ['cap', 'head']]))  # 5
