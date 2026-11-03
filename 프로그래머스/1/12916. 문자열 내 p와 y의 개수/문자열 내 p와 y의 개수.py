def solution(s):
    s_lower = s.lower()

    p = list(filter(lambda x: x == "p", s_lower))
    y = list(filter(lambda x: x == "y", s_lower))
    
    return len(p) == len(y)
