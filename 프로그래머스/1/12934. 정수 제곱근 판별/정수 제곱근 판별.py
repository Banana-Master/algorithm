def solution(n):
    sqrt = n ** 0.5
    
    if sqrt.is_integer():
        return int(sqrt + 1) ** 2
    else:
        return -1
