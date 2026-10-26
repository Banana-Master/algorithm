// 1) 재귀 DFS (인접 리스트)
function dfsRecursive(graph, start) {
  const visited = new Array(graph.length).fill(false);
  const order = [];

  function dfs(v) {
    visited[v] = true;
    order.push(v);
    for (const next of graph[v]) {
      if (!visited[next]) dfs(next);
    }
  }

  dfs(start);
  return order;
}

// 2) 스택 DFS (재귀 깊이 걱정 없음)
function dfsStack(graph, start) {
  const visited = new Array(graph.length).fill(false);
  const order = [];
  const stack = [start];
  while (stack.length) {
    const v = stack.pop();
    if (visited[v]) continue;
    visited[v] = true;
    order.push(v);
    // 작은 번호부터 방문하려면 역순으로 넣는다 (스택은 나중에 넣은 게 먼저 나옴)
    for (let i = graph[v].length - 1; i >= 0; i--) {
      if (!visited[graph[v][i]]) stack.push(graph[v][i]);
    }
  }
  return order;
}

// 3) 격자에서 연결된 덩어리(섬) 개수 세기
function countIslands(grid) {
  const n = grid.length;
  const m = grid[0].length;
  const visited = Array.from({ length: n }, () => new Array(m).fill(false));
  const dx = [-1, 1, 0, 0]; // 상하좌우
  const dy = [0, 0, -1, 1];

  function dfs(x, y) {
    visited[x][y] = true;
    for (let d = 0; d < 4; d++) {
      const nx = x + dx[d];
      const ny = y + dy[d];
      if (nx >= 0 && nx < n && ny >= 0 && ny < m && grid[nx][ny] === 1 && !visited[nx][ny]) {
        dfs(nx, ny);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        dfs(i, j); // 새 덩어리 발견 → 연결된 칸을 모두 방문 처리
        count++;
      }
    }
  }
  return count;
}

// 4) 타겟 넘버: 각 숫자에 +/- 를 붙여 target을 만드는 경우의 수
function targetNumber(numbers, target) {
  function dfs(i, total) {
    if (i === numbers.length) return total === target ? 1 : 0;
    return dfs(i + 1, total + numbers[i]) + dfs(i + 1, total - numbers[i]);
  }
  return dfs(0, 0);
}

// 1-2, 1-3, 2-4, 2-5, 3-6  (0번은 사용하지 않음)
const n = 6;
const graph = Array.from({ length: n + 1 }, () => []);
for (const [a, b] of [[1, 2], [1, 3], [2, 4], [2, 5], [3, 6]]) {
  graph[a].push(b);
  graph[b].push(a);
}
graph.forEach((adj) => adj.sort((a, b) => a - b)); // 번호가 작은 정점부터 방문

console.log(dfsRecursive(graph, 1)); // [ 1, 2, 4, 5, 3, 6 ]
console.log(dfsStack(graph, 1));     // [ 1, 2, 4, 5, 3, 6 ]

const grid = [
  [1, 1, 0, 0, 0],
  [1, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0],
];
console.log(countIslands(grid));               // 3
console.log(targetNumber([1, 1, 1, 1, 1], 3)); // 5
