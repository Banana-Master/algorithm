// 1) 1차원 누적합: S[i] = arr[0] + ... + arr[i-1]
function prefixSum(arr) {
  const s = new Array(arr.length + 1).fill(0);
  arr.forEach((x, i) => {
    s[i + 1] = s[i] + x;
  });
  return s;
}

// 2) 2차원 누적합 (백준 11660): 1-indexed 좌표 (x1,y1)~(x2,y2) 구간 합
function prefixSum2D(grid) {
  const n = grid.length;
  const m = grid[0].length;
  const s = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + grid[i - 1][j - 1];
    }
  }
  return s;
}

function rangeSum2D(s, x1, y1, x2, y2) {
  return s[x2][y2] - s[x1 - 1][y2] - s[x2][y1 - 1] + s[x1 - 1][y1 - 1];
}

// 3) 나머지 합 (백준 10986): 연속 구간 합이 m으로 나누어떨어지는 구간 개수
//    S[j] % m == S[i] % m 인 (i, j) 쌍의 개수와 같다
function modSumCount(arr, m) {
  const count = new Array(m).fill(0);
  count[0] = 1; // S[0] = 0
  let total = 0;
  let answer = 0;
  for (const x of arr) {
    total = (total + x) % m;
    answer += count[total]; // 앞에서 같은 나머지가 나온 횟수만큼 구간이 생김
    count[total]++;
  }
  return answer;
}

// 4) 같은 방향 투 포인터 (백준 2018 수들의 합 5): 연속된 자연수의 합으로 n을 만드는 방법 수
function consecutiveSumWays(n) {
  let start = 1;
  let end = 1;
  let total = 1;
  let count = 0;
  while (start <= n) {
    if (total === n) count++;
    if (total < n) {
      end++;
      total += end; // 구간 늘리기
    } else {
      total -= start; // 구간 줄이기
      start++;
    }
  }
  return count;
}

// 5) 양 끝 투 포인터 (백준 1940 주몽): 정렬된 배열에서 합이 target인 쌍의 개수
function pairCount(arr, target) {
  const sorted = [...arr].sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;
  let count = 0;
  while (left < right) {
    const s = sorted[left] + sorted[right];
    if (s === target) {
      count++;
      left++;
      right--;
    } else if (s < target) left++;
    else right--;
  }
  return count;
}

// 6) 슬라이딩 윈도우 (백준 2559 수열): 길이 k 구간 합의 최댓값
function maxWindowSum(arr, k) {
  let window = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let best = window;
  for (let i = k; i < arr.length; i++) {
    window += arr[i] - arr[i - k]; // 들어온 값 더하고, 빠진 값 빼기
    best = Math.max(best, window);
  }
  return best;
}

const s = prefixSum([5, 4, 3, 2, 1]);
console.log(s);           // [ 0, 5, 9, 12, 14, 15 ]
console.log(s[4] - s[1]); // 9  (arr[1] ~ arr[3])

const s2 = prefixSum2D([[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7]]);
console.log(rangeSum2D(s2, 2, 2, 3, 4)); // 27

console.log(modSumCount([1, 2, 3, 1, 2], 3)); // 7
console.log(consecutiveSumWays(15));            // 4  (15, 7+8, 4+5+6, 1+2+3+4+5)
console.log(pairCount([2, 7, 4, 1, 5, 3], 9));  // 2  (2+7, 4+5)
console.log(maxWindowSum([3, -2, -4, -9, 0, 3, 7, 13, 8, -3], 2)); // 21
