// 1) 스택: 올바른 괄호 판별
function isValidParentheses(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const ch of s) {
    if ('([{'.includes(ch)) {
      stack.push(ch);
    } else {
      // 닫는 괄호인데 스택이 비었거나 짝이 안 맞으면 실패
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) return false;
      stack.pop();
    }
  }
  return stack.length === 0; // 여는 괄호가 남아 있으면 실패
}

// 2) 단조 스택: 각 원소의 오른쪽에서 처음으로 나보다 큰 수 (없으면 -1)
function nextGreater(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // 아직 답을 못 찾은 인덱스
  nums.forEach((x, i) => {
    while (stack.length && nums[stack[stack.length - 1]] < x) {
      result[stack.pop()] = x;
    }
    stack.push(i);
  });
  return result;
}

// 3) 큐: JS 배열의 shift()는 O(N)이므로 head 인덱스로 꺼낸다
class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
  }
  push(x) {
    this.items.push(x);
  }
  pop() {
    return this.items[this.head++];
  }
  get size() {
    return this.items.length - this.head;
  }
}

// 요세푸스 문제: K번째 사람을 계속 제거
function josephus(n, k) {
  const queue = new Queue();
  for (let i = 1; i <= n; i++) queue.push(i);
  const order = [];
  while (queue.size > 0) {
    for (let i = 0; i < k - 1; i++) queue.push(queue.pop()); // 앞의 k-1명을 뒤로 보냄
    order.push(queue.pop());
  }
  return order;
}

console.log(isValidParentheses('([]{})')); // true
console.log(isValidParentheses('(]'));     // false
console.log(isValidParentheses('(('));     // false
console.log(nextGreater([3, 5, 2, 7]));    // [ 5, 7, 7, -1 ]
console.log(josephus(7, 3));               // [ 3, 6, 2, 7, 5, 1, 4 ]
