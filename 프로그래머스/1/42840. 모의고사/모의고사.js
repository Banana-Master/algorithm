function solution(answers) {
    const patterns = [
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    ];

    // 1. 각 수포자의 맞힌 문제 수를 계산
    const scores = patterns.map(pattern =>
        answers.filter((answer, i) => answer === pattern[i % pattern.length]).length
    );

    // 2. 최고 점수 탐색
    const maxScore = Math.max(...scores);

    // 3. 최고 점수를 받은 사람의 번호(인덱스 + 1) 추출
    return scores
        .map((score, i) => (score === maxScore ? i + 1 : null))
        .filter(Boolean);
}