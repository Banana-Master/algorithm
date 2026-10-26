import heapq


# 1) 더 맵게 (프로그래머스 42626)
#    가장 안 매운 두 개를 섞기: 새 지수 = 가장 작은 값 + 두 번째로 작은 값 * 2
#    모든 음식이 K 이상이 되는 최소 횟수 (불가능하면 -1)
def spicier(scoville, k):
    h = scoville[:]
    heapq.heapify(h)  # 리스트를 힙으로 변환 O(N)
    count = 0
    while h[0] < k:
        if len(h) < 2:
            return -1
        a = heapq.heappop(h)
        b = heapq.heappop(h)
        heapq.heappush(h, a + b * 2)
        count += 1
    return count


# 2) 최대 힙: 부호를 뒤집어서 넣고, 꺼낼 때 다시 뒤집는다
def top_k_largest(nums, k):
    h = [-x for x in nums]
    heapq.heapify(h)
    return [-heapq.heappop(h) for _ in range(k)]


# 3) 튜플 우선순위: (우선순위, 값) 형태로 넣으면 첫 원소 기준으로 정렬
def process_by_priority(tasks):
    h = []
    for name, priority in tasks:
        heapq.heappush(h, (priority, name))
    return [heapq.heappop(h)[1] for _ in range(len(h))]


# 4) 카드 정렬하기 (백준 1715): 항상 가장 작은 두 묶음부터 합치기
def card_merge(cards):
    h = cards[:]
    heapq.heapify(h)
    total = 0
    while len(h) > 1:
        merged = heapq.heappop(h) + heapq.heappop(h)
        total += merged
        heapq.heappush(h, merged)
    return total


if __name__ == '__main__':
    print(spicier([1, 2, 3, 9, 10, 12], 7))         # 2
    print(top_k_largest([3, 1, 4, 1, 5, 9, 2, 6], 3))  # [9, 6, 5]
    print(process_by_priority([('청소', 3), ('숙제', 1), ('게임', 5), ('운동', 2)]))
    # ['숙제', '운동', '청소', '게임']
    print(card_merge([10, 20, 40]))  # 100  (10+20=30, 30+40=70 → 30+70)
