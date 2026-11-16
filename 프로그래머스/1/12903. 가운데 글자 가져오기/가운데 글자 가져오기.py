def solution(s):
    d = len(s) // 2
    return s[d-1:d+1] if len(s) % 2 == 0 else s[d]