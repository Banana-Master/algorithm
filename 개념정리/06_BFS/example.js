// JS의 shift()는 O(N)이므로, 배열 + head 인덱스로 큐를 흉내 낸다.
//   const queue = [start]; let head = 0;
//   while (head < queue.length) { const v = queue[head++]; ... }

// 1) 기본 BFS: 방문 순서 + 시작점으로부터의 최단 거리
function bfs(graph, start) {
  const dist = new Array(graph.length).fill(-1); // -1 = 아직 방문 안 함
  dist[start] = 0;
  const order = [];
  const queue = [start];
  let head = 0;
  while (head < queue.length) {
    const v = queue[head++];
    order.push(v);
    for (const next of graph[v]) {
      if (dist[next] === -1) {
        dist[next] = dist[v] + 1; // 큐에 넣을 때 방문 처리!
        queue.push(next);
      }
    }
  }
  return [order, dist];
}

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

// 2) 격자 최단 거리 (백준 2178 미로 탐색, 프로그래머스 게임 맵 최단거리)
//    1 = 이동 가능, 0 = 벽. (0,0)에서 (n-1,m-1)까지 지나는 칸 수, 못 가면 -1
function mazeShortest(maze) {
  const n = maze.length;
  const m = maze[0].length;
  const dist = Array.from({ length: n }, () => new Array(m).fill(0));
  dist[0][0] = 1;
  const queue = [[0, 0]];
  let head = 0;
  while (head < queue.length) {
    const [x, y] = queue[head++];
    if (x === n - 1 && y === m - 1) return dist[x][y];
    for (const [dx, dy] of DIRS) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < n && ny >= 0 && ny < m && maze[nx][ny] === 1 && dist[nx][ny] === 0) {
        dist[nx][ny] = dist[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  return -1;
}

// 3) 멀티 소스 BFS (백준 7576 토마토)
//    1 = 익은 토마토, 0 = 안 익은 토마토, -1 = 빈 칸. 모두 익는 데 걸리는 날 수, 불가능하면 -1
function tomato(input) {
  const box = input.map((row) => [...row]);
  const n = box.length;
  const m = box[0].length;
  const queue = [];
  let head = 0;
  // 시작점(익은 토마토)을 처음부터 전부 큐에 넣는다
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) if (box[i][j] === 1) queue.push([i, j]);
  }
  while (head < queue.length) {
    const [x, y] = queue[head++];
    for (const [dx, dy] of DIRS) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < n && ny >= 0 && ny < m && box[nx][ny] === 0) {
        box[nx][ny] = box[x][y] + 1; // 날짜를 칸에 기록
        queue.push([nx, ny]);
      }
    }
  }
  if (box.some((row) => row.includes(0))) return -1;
  return Math.max(...box.map((row) => Math.max(...row))) - 1;
}

const n = 6;
const graph = Array.from({ length: n + 1 }, () => []);
for (const [a, b] of [[1, 2], [1, 3], [2, 4], [2, 5], [3, 6]]) {
  graph[a].push(b);
  graph[b].push(a);
}
const [order, dist] = bfs(graph, 1);
console.log(order);         // [ 1, 2, 3, 4, 5, 6 ]
console.log(dist.slice(1)); // [ 0, 1, 1, 2, 2, 2 ]

const maze = [
  [1, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1],
];
console.log(mazeShortest(maze)); // 15

const box = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 1],
];
console.log(tomato(box)); // 5
