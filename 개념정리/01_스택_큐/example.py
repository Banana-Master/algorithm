from collections import deque


# 1) 스택: 올바른 괄호 판별
def is_valid_parentheses(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        else:
            # 닫는 괄호인데 스택이 비었거나 짝이 안 맞으면 실패
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
    return not stack  # 여는 괄호가 남아 있으면 실패


# 2) 단조 스택: 각 원소의 오른쪽에서 처음으로 나보다 큰 수 (없으면 -1)
def next_greater(nums):
    result = [-1] * len(nums)
    stack = []  # 아직 답을 못 찾은 인덱스
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            result[stack.pop()] = x
        stack.append(i)
    return result


# 3) 큐: 들어온 순서대로 처리 (요세푸스 문제: K번째 사람을 계속 제거)
def josephus(n, k):
    queue = deque(range(1, n + 1))
    order = []
    while queue:
        queue.rotate(-(k - 1))  # 앞의 k-1명을 뒤로 보냄
        order.append(queue.popleft())
    return order


if __name__ == '__main__':
    print(is_valid_parentheses('([]{})'))  # True
    print(is_valid_parentheses('(]'))      # False
    print(is_valid_parentheses('(('))      # False
    print(next_greater([3, 5, 2, 7]))      # [5, 7, 7, -1]
    print(josephus(7, 3))                  # [3, 6, 2, 7, 5, 1, 4]
