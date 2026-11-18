def solution(s, n):
    big = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    small = "abcdefghijklmnopqrstuvwxyz"
    result = ""
    for i in s:
        if i in big:
            result += big[(big.index(i) + n) % len(big)]
        elif i in small:
            result += small[(small.index(i) + n) % len(small)]
        else:
            result += " "
            
    return result