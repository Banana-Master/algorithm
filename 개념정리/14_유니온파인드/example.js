class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
  }

  find(x) {
    // 반복문 + 경로 압축
    let root = x;
    while (this.parent[root] !== root) root = this.parent[root];
    while (this.parent[x] !== root) {
      const next = this.parent[x];
      this.parent[x] = root;
      x = next;
    }
    return root;
  }

  union(a, b) {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return false; // 이미 같은 그룹 (이 간선을 넣으면 사이클)
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra; // 작은 그룹을 큰 그룹 밑에 붙인다
    this.size[ra] += this.size[rb];
    return true;
  }
}

// 크루스칼: 최소 스패닝 트리 비용 (프로그래머스 섬 연결하기)
//    costs = [[a, b, 비용], ...]
function kruskal(n, costs) {
  const uf = new UnionFind(n);
  let total = 0;
  for (const [a, b, cost] of [...costs].sort((x, y) => x[2] - y[2])) { // 비용이 싼 간선부터
    if (uf.union(a, b)) total += cost; // 사이클이 생기지 않을 때만 선택
  }
  return total;
}

const uf = new UnionFind(6);
uf.union(1, 2);
uf.union(3, 4);
console.log(uf.find(2) === uf.find(4)); // false
uf.union(2, 4);
console.log(uf.find(2) === uf.find(4)); // true
console.log(new Set([1, 2, 3, 4, 5].map((i) => uf.find(i))).size); // 2  (그룹 {1,2,3,4}, {5})
console.log(uf.union(1, 3)); // false  (이미 같은 그룹 → 사이클)

console.log(kruskal(4, [[0, 1, 1], [0, 2, 2], [1, 2, 5], [1, 3, 1], [2, 3, 8]])); // 4
