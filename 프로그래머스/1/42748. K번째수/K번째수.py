def solution(array, commands):
    answer = []
    
    for command in commands:
        i, j, k = command
        sliced_array = array[i - 1 : j]
        sliced_array.sort()
        answer.append(sliced_array[k - 1])
        
    return answer