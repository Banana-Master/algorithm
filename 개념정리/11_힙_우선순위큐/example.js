// JS에는 내장 힙이 없으므로 직접 구현한다.
// compare(a, b) < 0 이면 a가 먼저 나온다. 기본은 최소 힙.
//   최대 힙:  new MinHeap((a, b) => b - a)
//   배열 비교: new MinHeap((a, b) => a[0] - b[0])
class MinHeap {
  constructor(compare = (a, b) => a - b) {
    this.heap = [];
    this.compare = compare;
  }

  get size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(value) {
    const heap = this.heap;
    heap.push(value);
    let i = heap.length - 1;
    // 부모보다 작으면 위로 올린다
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(heap[i], heap[parent]) >= 0) break;
      [heap[i], heap[parent]] = [heap[parent], heap[i]];
      i = parent;
    }
  }

  pop() {
    const heap = this.heap;
    if (heap.length === 0) return undefined;
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      let i = 0;
      // 자식 중 더 작은 쪽과 비교해서 아래로 내린다
      while (true) {
        const left = i * 2 + 1;
        const right = i * 2 + 2;
        let smallest = i;
        if (left < heap.length && this.compare(heap[left], heap[smallest]) < 0) smallest = left;
        if (right < heap.length && this.compare(heap[right], heap[smallest]) < 0) smallest = right;
        if (smallest === i) break;
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        i = smallest;
      }
    }
    return top;
  }
}

// 1) 더 맵게 (프로그래머스 42626)
//    가장 안 매운 두 개를 섞기: 새 지수 = 가장 작은 값 + 두 번째로 작은 값 * 2
//    모든 음식이 K 이상이 되는 최소 횟수 (불가능하면 -1)
function spicier(scoville, k) {
  const heap = new MinHeap();
  scoville.forEach((s) => heap.push(s));
  let count = 0;
  while (heap.peek() < k) {
    if (heap.size < 2) return -1;
    const a = heap.pop();
    const b = heap.pop();
    heap.push(a + b * 2);
    count++;
  }
  return count;
}

// 2) 최대 힙: 비교 함수만 뒤집으면 된다
function topKLargest(nums, k) {
  const heap = new MinHeap((a, b) => b - a);
  nums.forEach((x) => heap.push(x));
  return Array.from({ length: k }, () => heap.pop());
}

// 3) 배열 우선순위: [우선순위, 값] 형태
function processByPriority(tasks) {
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  for (const [name, priority] of tasks) heap.push([priority, name]);
  const order = [];
  while (heap.size) order.push(heap.pop()[1]);
  return order;
}

// 4) 카드 정렬하기 (백준 1715): 항상 가장 작은 두 묶음부터 합치기
function cardMerge(cards) {
  const heap = new MinHeap();
  cards.forEach((c) => heap.push(c));
  let total = 0;
  while (heap.size > 1) {
    const merged = heap.pop() + heap.pop();
    total += merged;
    heap.push(merged);
  }
  return total;
}

console.log(spicier([1, 2, 3, 9, 10, 12], 7));            // 2
console.log(topKLargest([3, 1, 4, 1, 5, 9, 2, 6], 3));    // [ 9, 6, 5 ]
console.log(processByPriority([['청소', 3], ['숙제', 1], ['게임', 5], ['운동', 2]]));
// [ '숙제', '운동', '청소', '게임' ]
console.log(cardMerge([10, 20, 40])); // 100  (10+20=30, 30+40=70 → 30+70)
