// 1) 재귀로 순열 직접 만들기 (백준 15649 N과 M (1))
function permutations(nums, r) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  const path = [];

  function backtrack() {
    if (path.length === r) {
      result.push([...path]); // 복사본 저장!
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; // 선택
      path.push(nums[i]);
      backtrack(); // 다음 단계
      path.pop(); // 선택 취소 (원상복구)
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

// 2) 재귀로 조합 직접 만들기: start 이후 원소만 고르면 순서 중복이 생기지 않음
function combinations(nums, r) {
  const result = [];
  const path = [];

  function backtrack(start) {
    if (path.length === r) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}

// 3) 백트래킹 + 가지치기: N-Queen 배치 개수
function nQueen(n) {
  const cols = new Array(n).fill(false);
  const diag1 = new Array(2 * n).fill(false); // row + col 이 같은 대각선
  const diag2 = new Array(2 * n).fill(false); // row - col + n 이 같은 대각선
  let count = 0;

  function place(row) {
    if (row === n) {
      count++;
      return;
    }
    for (let col = 0; col < n; col++) {
      // 공격받는 칸이면 더 들어가지 않음 (가지치기)
      if (cols[col] || diag1[row + col] || diag2[row - col + n]) continue;
      cols[col] = diag1[row + col] = diag2[row - col + n] = true;
      place(row + 1);
      cols[col] = diag1[row + col] = diag2[row - col + n] = false;
    }
  }

  place(0);
  return count;
}

console.log(permutations([1, 2, 3], 2));    // [[1,2],[1,3],[2,1],[2,3],[3,1],[3,2]]
console.log(combinations([1, 2, 3, 4], 2)); // [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
console.log(nQueen(8));                     // 92

// 부분집합: 각 원소를 넣는다/안 넣는다 → 비트마스크로 2^N개
const nums = [1, 2, 3];
const subsets = [];
for (let mask = 0; mask < 1 << nums.length; mask++) {
  subsets.push(nums.filter((_, i) => mask & (1 << i)));
}
console.log(subsets); // [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
