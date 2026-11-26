repeat = int(input())

for i in range(repeat):
    x1, y1, r1, x2, y2, r2 = map(int, input().split())
    # 피타고라스: 거리² = (x 차이)² + (y 차이)²
    d = (x2 - x1) ** 2 + (y2 - y1) ** 2   # 중심 사이 거리의 제곱
    plus = (r1 + r2) ** 2                 # 반지름 합의 제곱
    minus = (r1 - r2) ** 2                # 반지름 차의 제곱

    if d == 0 and r1 == r2:               # 두 원이 완전히 겹침
        print(-1)
    elif d == plus or d == minus:         # 한 점에서 닿음
        print(1)
    elif minus < d < plus:                # 두 점에서 만남
        print(2)
    else:                                 # 만나지 않음
        print(0)