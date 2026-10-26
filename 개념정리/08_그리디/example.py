# 1) 동전 0 (백준 11047): 큰 동전부터 최대한 사용
#    (큰 동전이 작은 동전의 배수일 때만 최적)
def min_coins(coins, amount):
    count = 0
    for coin in sorted(coins, reverse=True):
        count += amount // coin
        amount %= coin
    return count


# 2) 회의실 배정 (백준 1931): 끝나는 시간이 빠른 회의부터 선택
def max_meetings(meetings):
    meetings = sorted(meetings, key=lambda m: (m[1], m[0]))  # 끝 시간, 같으면 시작 시간
    count = 0
    last_end = 0
    for start, end in meetings:
        if start >= last_end:
            count += 1
            last_end = end
    return count


# 3) 구명보트 (프로그래머스 42885): 최대 2명, 무게 제한 limit. 필요한 보트 최소 개수
def lifeboats(people, limit):
    people = sorted(people)
    light, heavy = 0, len(people) - 1
    boats = 0
    while light <= heavy:
        if people[light] + people[heavy] <= limit:
            light += 1  # 가장 가벼운 사람도 함께 태움
        heavy -= 1      # 가장 무거운 사람은 항상 태움
        boats += 1
    return boats


# 4) 큰 수 만들기 (프로그래머스 42883): 숫자 k개를 제거해 가장 큰 수 만들기
def largest_number(number, k):
    stack = []
    for digit in number:
        # 앞자리가 클수록 좋으므로, 더 큰 숫자가 오면 앞의 작은 숫자를 제거
        while k > 0 and stack and stack[-1] < digit:
            stack.pop()
            k -= 1
        stack.append(digit)
    return ''.join(stack[:len(stack) - k])  # 아직 k가 남았으면 뒤에서 제거


if __name__ == '__main__':
    print(min_coins([1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000], 4200))  # 6
    print(min_coins([1, 3, 4], 6))  # 3  <- 최적은 2 (3+3). 그리디가 실패하는 예!
    print(max_meetings([(1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9),
                        (6, 10), (8, 11), (8, 12), (2, 13), (12, 14)]))  # 4
    print(lifeboats([70, 50, 80, 50], 100))  # 3
    print(largest_number('1924', 2))         # 94
    print(largest_number('4177252841', 4))   # 775841
