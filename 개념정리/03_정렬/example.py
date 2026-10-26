from functools import cmp_to_key

if __name__ == '__main__':
    nums = [10, 9, 1, 25]
    print(sorted(nums))                # [1, 9, 10, 25]
    print(sorted(nums, reverse=True))  # [25, 10, 9, 1]

    # 1) 여러 기준: 길이 오름차순, 길이가 같으면 사전순 (백준 1181 단어 정렬)
    words = ['but', 'i', 'wont', 'hesitate', 'no', 'more', 'it', 'cannot']
    print(sorted(set(words), key=lambda w: (len(w), w)))
    # ['i', 'it', 'no', 'but', 'more', 'wont', 'cannot', 'hesitate']

    # 2) 점수 내림차순, 같으면 이름 오름차순 (숫자 앞에 - 를 붙이면 내림차순)
    students = [('kim', 90), ('lee', 85), ('park', 90)]
    print(sorted(students, key=lambda s: (-s[1], s[0])))
    # [('kim', 90), ('park', 90), ('lee', 85)]

    # 3) 직접 비교 함수: 이어 붙였을 때 가장 큰 수 (프로그래머스 가장 큰 수)
    def compare(a, b):
        if a + b > b + a:
            return -1  # a가 앞으로
        if a + b < b + a:
            return 1
        return 0

    strs = sorted(map(str, [3, 30, 34, 5, 9]), key=cmp_to_key(compare))
    print(str(int(''.join(strs))))  # 9534330 (int로 한 번 감싸서 "000" -> "0" 처리)
