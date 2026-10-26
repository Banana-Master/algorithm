class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n

    def find(self, x):
        # 반복문 + 경로 압축 (재귀 깊이 걱정 없음)
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while self.parent[x] != root:
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False  # 이미 같은 그룹 (이 간선을 넣으면 사이클)
        if self.size[ra] < self.size[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra  # 작은 그룹을 큰 그룹 밑에 붙인다
        self.size[ra] += self.size[rb]
        return True


# 크루스칼: 최소 스패닝 트리 비용 (프로그래머스 섬 연결하기)
#    costs = [[a, b, 비용], ...]
def kruskal(n, costs):
    uf = UnionFind(n)
    total = 0
    for a, b, cost in sorted(costs, key=lambda e: e[2]):  # 비용이 싼 간선부터
        if uf.union(a, b):  # 사이클이 생기지 않을 때만 선택
            total += cost
    return total


if __name__ == '__main__':
    uf = UnionFind(6)
    uf.union(1, 2)
    uf.union(3, 4)
    print(uf.find(2) == uf.find(4))  # False
    uf.union(2, 4)
    print(uf.find(2) == uf.find(4))  # True
    print(len({uf.find(i) for i in range(1, 6)}))  # 2  (그룹 {1,2,3,4}, {5})
    print(uf.union(1, 3))            # False  (이미 같은 그룹 → 사이클)

    print(kruskal(4, [[0, 1, 1], [0, 2, 2], [1, 2, 5], [1, 3, 1], [2, 3, 8]]))  # 4
