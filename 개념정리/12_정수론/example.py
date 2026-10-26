import math


# 1) 소수 판별: 2 ~ √n 까지만 나눠 본다 O(√N)
def is_prime(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True


# 2) 에라토스테네스의 체: n 이하의 모든 소수
def sieve(n):
    is_p = [True] * (n + 1)
    is_p[0] = is_p[1] = False
    i = 2
    while i * i <= n:
        if is_p[i]:
            for j in range(i * i, n + 1, i):  # i*i 부터 지워도 충분
                is_p[j] = False
        i += 1
    return [x for x in range(n + 1) if is_p[x]]


# 3) 유클리드 호제법
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a


def lcm(a, b):
    return a // gcd(a, b) * b


# 4) 약수 구하기 O(√N)
def divisors(n):
    small, large = [], []
    i = 1
    while i * i <= n:
        if n % i == 0:
            small.append(i)
            if i != n // i:
                large.append(n // i)
        i += 1
    return small + large[::-1]


if __name__ == '__main__':
    print([x for x in range(20) if is_prime(x)])  # [2, 3, 5, 7, 11, 13, 17, 19]
    print(sieve(30))                              # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    print(gcd(48, 18), math.gcd(48, 18))          # 6 6
    print(lcm(4, 6))                              # 12

    # 여러 수의 최소공배수 (프로그래머스 N개의 최소공배수)
    from functools import reduce
    print(reduce(lcm, [2, 6, 8, 14]))  # 168

    print(divisors(36))  # [1, 2, 3, 4, 6, 9, 12, 18, 36]
