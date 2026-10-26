// 1) 개수 세기: 완주하지 못한 선수 (participant 중 completion에 없는 1명)
function notCompleted(participant, completion) {
  const count = new Map();
  for (const name of participant) count.set(name, (count.get(name) || 0) + 1);
  for (const name of completion) count.set(name, count.get(name) - 1);
  for (const [name, c] of count) {
    if (c > 0) return name;
  }
}

// 2) Two Sum: 합이 target인 두 수의 인덱스 (지금까지 본 값을 해시에 저장)
function twoSum(nums, target) {
  const seen = new Map(); // 값 -> 인덱스
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];
    seen.set(nums[i], i);
  }
  return [];
}

// 3) 그룹 묶기: 종류별 개수로 조합 수 계산 (의상 문제)
function clothesCombinations(clothes) {
  const byKind = new Map();
  for (const [, kind] of clothes) byKind.set(kind, (byKind.get(kind) || 0) + 1);
  let answer = 1;
  for (const c of byKind.values()) answer *= c + 1; // 해당 종류를 안 입는 경우 +1
  return answer - 1; // 아무것도 안 입는 경우 제외
}

console.log(notCompleted(['leo', 'kiki', 'eden'], ['eden', 'kiki'])); // leo
console.log(twoSum([2, 7, 11, 15], 9));                               // [ 0, 1 ]
console.log(clothesCombinations([['hat', 'head'], ['sunglasses', 'eye'], ['cap', 'head']])); // 5
