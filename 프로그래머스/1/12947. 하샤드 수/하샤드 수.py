def solution(x):
    arr = list(map(int, str(x)))
    sumValue = sum(arr)
    print(arr, sumValue)
    return x % sumValue == 0