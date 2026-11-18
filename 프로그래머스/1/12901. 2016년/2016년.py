def solution(a, b):
    days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
    
    result = 0
    
    for i in range(a - 1):
        result += days[i]
    result += b - 1
    
    return weekday[(result + 5) % 7]