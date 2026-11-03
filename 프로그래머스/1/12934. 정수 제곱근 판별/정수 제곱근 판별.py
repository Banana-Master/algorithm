def solution(n):
    answer = 1
    while (answer <= n):
        if (answer * answer == n):
            return (answer + 1) * (answer + 1)
        else:
            answer += 1
    return -1