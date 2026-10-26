import sys

sys.setrecursionlimit(10**6)  # 재귀 DFS 필수


# 1) 재귀 DFS (인접 리스트)
def dfs_recursive(graph, start):
    visited = [False] * len(graph)
    order = []

    def dfs(v):
        visited[v] = True
        order.append(v)
        for nxt in graph[v]:
            if not visited[nxt]:
                dfs(nxt)

    dfs(start)
    return order


# 2) 스택 DFS (재귀 깊이 걱정 없음)
def dfs_stack(graph, start):
    visited = [False] * len(graph)
    order = []
    stack = [start]
    while stack:
        v = stack.pop()
        if visited[v]:
            continue
        visited[v] = True
        order.append(v)
        # 작은 번호부터 방문하려면 역순으로 넣는다 (스택은 나중에 넣은 게 먼저 나옴)
        for nxt in reversed(graph[v]):
            if not visited[nxt]:
                stack.append(nxt)
    return order


# 3) 격자에서 연결된 덩어리(섬) 개수 세기
def count_islands(grid):
    n, m = len(grid), len(grid[0])
    visited = [[False] * m for _ in range(n)]
    dx = [-1, 1, 0, 0]  # 상하좌우
    dy = [0, 0, -1, 1]

    def dfs(x, y):
        visited[x][y] = True
        for d in range(4):
            nx, ny = x + dx[d], y + dy[d]
            if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] == 1 and not visited[nx][ny]:
                dfs(nx, ny)

    count = 0
    for i in range(n):
        for j in range(m):
            if grid[i][j] == 1 and not visited[i][j]:
                dfs(i, j)  # 새 덩어리 발견 → 연결된 칸을 모두 방문 처리
                count += 1
    return count


# 4) 타겟 넘버: 각 숫자에 +/- 를 붙여 target을 만드는 경우의 수
def target_number(numbers, target):
    def dfs(i, total):
        if i == len(numbers):
            return 1 if total == target else 0
        return dfs(i + 1, total + numbers[i]) + dfs(i + 1, total - numbers[i])

    return dfs(0, 0)


if __name__ == '__main__':
    # 1-2, 1-3, 2-4, 2-5, 3-6  (0번은 사용하지 않음)
    n = 6
    graph = [[] for _ in range(n + 1)]
    for a, b in [(1, 2), (1, 3), (2, 4), (2, 5), (3, 6)]:
        graph[a].append(b)
        graph[b].append(a)
    for adj in graph:
        adj.sort()  # 번호가 작은 정점부터 방문

    print(dfs_recursive(graph, 1))  # [1, 2, 4, 5, 3, 6]
    print(dfs_stack(graph, 1))      # [1, 2, 4, 5, 3, 6]

    grid = [
        [1, 1, 0, 0, 0],
        [1, 0, 0, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0],
    ]
    print(count_islands(grid))                  # 3
    print(target_number([1, 1, 1, 1, 1], 3))    # 5
