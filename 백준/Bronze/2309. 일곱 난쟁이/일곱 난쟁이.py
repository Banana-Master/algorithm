heights = []

for i in range(9):
    heights.append(int(input()))
heights.sort()

total = sum(heights)

spy1 = spy2 = -1
for i in range(9):
    for j in range(i + 1, 9):
        if total - (heights[i] + heights[j]) == 100:
            spy1, spy2 = i, j
            break
    if spy1 != -1:
        break

result = [heights[k] for k in range(9) if k != spy1 and k != spy2]
print("\n".join(map(str, result)))