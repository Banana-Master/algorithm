a, b = map(int, input().strip().split(' '))

result = ""
for i in range(b):
    result += "*" * a + "\n"
    
print(result)