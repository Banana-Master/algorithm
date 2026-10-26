// 다익스트라에는 최소 힙이 필요하다 (11_힙_우선순위큐/example.js 와 같은 구현)
class MinHeap {
  constructor(compare = (a, b) => a - b) {
    this.heap = [];
    this.compare = compare;
  }

  get size() {
    return this.heap.length;
  }

  push(value) {
    const heap = this.heap;
    heap.push(value);
    let i = heap.length - 1;
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

// 1) 다익스트라: start에서 모든 정점까지의 최단 거리
//    graph[v] = [[next, cost], ...]
function dijkstra(graph, start) {
  const dist = new Array(graph.length).fill(Infinity);
  dist[start] = 0;
  const heap = new MinHeap((a, b) => a[0] - b[0]); // [거리, 정점]
  heap.push([0, start]);
  while (heap.size) {
    const [d, v] = heap.pop();
    if (d > dist[v]) continue; // 이미 더 짧은 거리로 처리된 정점
    for (const [next, cost] of graph[v]) {
      const nd = d + cost;
      if (nd < dist[next]) {
        dist[next] = nd;
        heap.push([nd, next]);
      }
    }
  }
  return dist;
}

// 2) 플로이드-워셜: 모든 정점 쌍 사이의 최단 거리 (정점 수가 적을 때)
function floydWarshall(n, edges) {
  const dist = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(Infinity));
  for (let i = 1; i <= n; i++) dist[i][i] = 0;
  for (const [a, b, cost] of edges) dist[a][b] = Math.min(dist[a][b], cost);
  for (let k = 1; k <= n; k++) { // 거쳐 가는 정점 k 가 가장 바깥!
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];
      }
    }
  }
  return dist;
}

// 백준 1753 예제: 방향 그래프, 정점 5개
const n = 5;
const edges = [[5, 1, 1], [1, 2, 2], [1, 3, 3], [2, 3, 4], [2, 4, 5], [3, 4, 6]];
const graph = Array.from({ length: n + 1 }, () => []);
for (const [a, b, cost] of edges) graph[a].push([b, cost]);

const dist = dijkstra(graph, 1);
console.log(dist.slice(1).map((d) => (d === Infinity ? 'INF' : d))); // [ 0, 2, 3, 7, 'INF' ]

const fw = floydWarshall(n, edges);
console.log(fw[1][4], fw[5][4]); // 7 8
