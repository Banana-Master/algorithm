def solution(participant, completion):
    answer = {}

    for x in participant:
        answer[x] = answer.get(x, 0) + 1
        
    for x in completion:
        answer[x] -= 1
    
    for key in answer:
        if answer[key] > 0:
            return key