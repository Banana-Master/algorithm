// 1) 동전 0 (백준 11047): 큰 동전부터 최대한 사용
//    (큰 동전이 작은 동전의 배수일 때만 최적)
function minCoins(coins, amount) {
  let count = 0;
  for (const coin of [...coins].sort((a, b) => b - a)) {
    count += Math.floor(amount / coin);
    amount %= coin;
  }
  return count;
}

// 2) 회의실 배정 (백준 1931): 끝나는 시간이 빠른 회의부터 선택
function maxMeetings(meetings) {
  const sorted = [...meetings].sort((a, b) => a[1] - b[1] || a[0] - b[0]); // 끝 시간, 같으면 시작 시간
  let count = 0;
  let lastEnd = 0;
  for (const [start, end] of sorted) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }
  return count;
}

// 3) 구명보트 (프로그래머스 42885): 최대 2명, 무게 제한 limit. 필요한 보트 최소 개수
function lifeboats(people, limit) {
  const sorted = [...people].sort((a, b) => a - b);
  let light = 0;
  let heavy = sorted.length - 1;
  let boats = 0;
  while (light <= heavy) {
    if (sorted[light] + sorted[heavy] <= limit) light++; // 가장 가벼운 사람도 함께 태움
    heavy--; // 가장 무거운 사람은 항상 태움
    boats++;
  }
  return boats;
}

// 4) 큰 수 만들기 (프로그래머스 42883): 숫자 k개를 제거해 가장 큰 수 만들기
function largestNumber(number, k) {
  const stack = [];
  for (const digit of number) {
    // 앞자리가 클수록 좋으므로, 더 큰 숫자가 오면 앞의 작은 숫자를 제거
    while (k > 0 && stack.length && stack[stack.length - 1] < digit) {
      stack.pop();
      k--;
    }
    stack.push(digit);
  }
  return stack.slice(0, stack.length - k).join(''); // 아직 k가 남았으면 뒤에서 제거
}

console.log(minCoins([1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000], 4200)); // 6
console.log(minCoins([1, 3, 4], 6)); // 3  <- 최적은 2 (3+3). 그리디가 실패하는 예!
console.log(maxMeetings([[1, 4], [3, 5], [0, 6], [5, 7], [3, 8], [5, 9],
  [6, 10], [8, 11], [8, 12], [2, 13], [12, 14]])); // 4
console.log(lifeboats([70, 50, 80, 50], 100)); // 3
console.log(largestNumber('1924', 2));         // 94
console.log(largestNumber('4177252841', 4));   // 775841
