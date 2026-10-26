// 1) 기본 이분 탐색: 값의 인덱스 (없으면 -1)
function binarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// 2) lower_bound: target 이상이 처음 나오는 위치
function lowerBound(arr, target) {
  let lo = 0;
  let hi = arr.length; // 전부 target보다 작으면 arr.length 반환
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// upper_bound: target 초과가 처음 나오는 위치
function upperBound(arr, target) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

// 3) 파라메트릭 서치 템플릿: 조건을 만족하는 "최솟값"
//    입국심사 (프로그래머스 43238): n명을 심사하는 데 필요한 최소 시간
function immigration(n, times) {
  // t분 안에 n명 이상 심사할 수 있는가?
  const canFinish = (t) => times.reduce((sum, time) => sum + Math.floor(t / time), 0) >= n;

  let lo = 1;
  let hi = Math.max(...times) * n;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (canFinish(mid)) hi = mid; // 가능 → 더 작은 값도 가능한지 왼쪽 탐색
    else lo = mid + 1; // 불가능 → 오른쪽
  }
  return lo;
}

// 4) 파라메트릭 서치 템플릿: 조건을 만족하는 "최댓값"
//    나무 자르기 (백준 2805): 적어도 m미터를 얻을 수 있는 절단기 높이의 최댓값
function cutTrees(trees, m) {
  // 높이 h로 자르면 m미터 이상인가?
  const enough = (h) => trees.reduce((sum, t) => sum + (t > h ? t - h : 0), 0) >= m;

  let lo = 0;
  let hi = Math.max(...trees);
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2); // 최댓값을 찾을 때는 +1 (안 하면 무한 루프)
    if (enough(mid)) lo = mid; // 가능 → 더 높여 본다
    else hi = mid - 1;
  }
  return lo;
}

const arr = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(arr, 11)); // 5
console.log(binarySearch(arr, 4));  // -1

const nums = [1, 2, 2, 2, 3, 5];
console.log(lowerBound(nums, 2));                         // 1
console.log(upperBound(nums, 2) - lowerBound(nums, 2));   // 3  (2의 개수)

console.log(immigration(6, [7, 10]));         // 28
console.log(cutTrees([20, 15, 10, 17], 7));   // 15
