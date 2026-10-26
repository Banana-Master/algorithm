from collections import deque


# 1) 기본 BFS: 방문 순서 + 시작점으로부터의 최단 거리
def bfs(graph, start):
    dist = [-1] * len(graph)  # -1 = 아직 방문 안 함 (visited 역할도 겸함)
    dist[start] = 0
    order = []
    queue = deque([start])
    while queue:
        v = queue.popleft()
        order.append(v)
        for nxt in graph[v]:
            if dist[nxt] == -1:
                dist[nxt] = dist[v] + 1  # 큐에 넣을 때 방문 처리!
                queue.append(nxt)
    return order, dist


# 2) 격자 최단 거리 (백준 2178 미로 탐색, 프로그래머스 게임 맵 최단거리)
#    1 = 이동 가능, 0 = 벽. (0,0)에서 (n-1,m-1)까지 지나는 칸 수, 못 가면 -1
def maze_shortest(maze):
    n, m = len(maze), len(maze[0])
    dist = [[0] * m for _ in range(n)]
    dist[0][0] = 1
    queue = deque([(0, 0)])
    while queue:
        x, y = queue.popleft()
        if (x, y) == (n - 1, m - 1):
            return dist[x][y]
        for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < n and 0 <= ny < m and maze[nx][ny] == 1 and dist[nx][ny] == 0:
                dist[nx][ny] = dist[x][y] + 1
                queue.append((nx, ny))
    return -1


# 3) 멀티 소스 BFS (백준 7576 토마토)
#    1 = 익은 토마토, 0 = 안 익은 토마토, -1 = 빈 칸. 모두 익는 데 걸리는 날 수, 불가능하면 -1
def tomato(box):
    n, m = len(box), len(box[0])
    box = [row[:] for row in box]
    # 시작점(익은 토마토)을 처음부터 전부 큐에 넣는다
    queue = deque((i, j) for i in range(n) for j in range(m) if box[i][j] == 1)
    while queue:
        x, y = queue.popleft()
        for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < n and 0 <= ny < m and box[nx][ny] == 0:
                box[nx][ny] = box[x][y] + 1  # 날짜를 칸에 기록
                queue.append((nx, ny))
    if any(0 in row for row in box):
        return -1
    return max(max(row) for row in box) - 1


if __name__ == '__main__':
    n = 6
    graph = [[] for _ in range(n + 1)]
    for a, b in [(1, 2), (1, 3), (2, 4), (2, 5), (3, 6)]:
        graph[a].append(b)
        graph[b].append(a)
    order, dist = bfs(graph, 1)
    print(order)     # [1, 2, 3, 4, 5, 6]
    print(dist[1:])  # [0, 1, 1, 2, 2, 2]

    maze = [
        [1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 1],
        [1, 1, 1, 0, 1, 1],
    ]
    print(maze_shortest(maze))  # 15

    box = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1],
    ]
    print(tomato(box))  # 5
