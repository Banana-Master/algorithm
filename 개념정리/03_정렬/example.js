const nums = [10, 9, 1, 25];
console.log([...nums].sort());                // [ 1, 10, 25, 9 ]  <- 문자열 정렬! 주의
console.log([...nums].sort((a, b) => a - b)); // [ 1, 9, 10, 25 ]
console.log([...nums].sort((a, b) => b - a)); // [ 25, 10, 9, 1 ]

// 1) 여러 기준: 길이 오름차순, 길이가 같으면 사전순 (백준 1181 단어 정렬)
const words = ['but', 'i', 'wont', 'hesitate', 'no', 'more', 'it', 'cannot'];
console.log([...new Set(words)].sort((a, b) => a.length - b.length || a.localeCompare(b)));
// [ 'i', 'it', 'no', 'but', 'more', 'wont', 'cannot', 'hesitate' ]

// 2) 점수 내림차순, 같으면 이름 오름차순
const students = [['kim', 90], ['lee', 85], ['park', 90]];
console.log(students.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
// [ [ 'kim', 90 ], [ 'park', 90 ], [ 'lee', 85 ] ]

// 3) 직접 비교: 이어 붙였을 때 가장 큰 수 (프로그래머스 가장 큰 수)
const strs = [3, 30, 34, 5, 9].map(String).sort((a, b) => (b + a).localeCompare(a + b));
const answer = strs.join('');
console.log(answer[0] === '0' ? '0' : answer); // 9534330 ("000" -> "0" 처리)
