// 1) 피보나치: Top-down (메모이제이션)
const memo = new Map();
function fibMemo(n) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const value = fibMemo(n - 1) + fibMemo(n - 2);
  memo.set(n, value);
  return value;
}

// 1) 피보나치: Bottom-up (테이블)
function fibTable(n) {
  const dp = new Array(n + 1).fill(0);
  if (n >= 1) dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}

// 2) 1로 만들기 (백준 1463)
//    dp[i] = i를 1로 만드는 최소 연산 횟수 (연산: -1, /2, /3)
function makeOne(n) {
  const dp = new Array(n + 1).fill(0);
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + 1;
    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  }
  return dp[n];
}

// 3) 정수 삼각형 (프로그래머스 43105): 위에서 아래로 내려가며 합의 최댓값
function triangleMax(triangle) {
  const dp = triangle.map((row) => [...row]);
  for (let i = 1; i < dp.length; i++) {
    for (let j = 0; j < dp[i].length; j++) {
      const left = j > 0 ? dp[i - 1][j - 1] : 0;
      const right = j < i ? dp[i - 1][j] : 0;
      dp[i][j] += Math.max(left, right);
    }
  }
  return Math.max(...dp[dp.length - 1]);
}

// 4) 0/1 배낭 (백준 12865): 무게 한도 k 안에서 가치 합의 최댓값
//    dp[w] = 무게 합이 w 이하일 때 최대 가치
function knapsack(items, k) {
  const dp = new Array(k + 1).fill(0);
  for (const [weight, value] of items) {
    // 큰 무게부터 거꾸로! (작은 쪽부터 하면 같은 물건을 여러 번 담게 됨)
    for (let w = k; w >= weight; w--) {
      dp[w] = Math.max(dp[w], dp[w - weight] + value);
    }
  }
  return dp[k];
}

// 5) LIS: 가장 긴 증가하는 부분 수열의 길이 (O(N^2))
//    dp[i] = i번째 원소로 끝나는 증가 부분 수열의 최대 길이
function lis(nums) {
  const dp = new Array(nums.length).fill(1);
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
}

console.log(fibMemo(50), fibTable(50)); // 12586269025 12586269025
console.log(makeOne(10));               // 3  (10 -> 9 -> 3 -> 1)
console.log(triangleMax([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]])); // 30
console.log(knapsack([[6, 13], [4, 8], [3, 6], [5, 12]], 7)); // 14
console.log(lis([10, 20, 10, 30, 20, 50])); // 4  (10, 20, 30, 50)
