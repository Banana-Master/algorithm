import heapq

INF = float('inf')


# 1) 다익스트라: start에서 모든 정점까지의 최단 거리
#    graph[v] = [(next, cost), ...]
def dijkstra(graph, start):
    dist = [INF] * len(graph)
    dist[start] = 0
    heap = [(0, start)]  # (거리, 정점)
    while heap:
        d, v = heapq.heappop(heap)
        if d > dist[v]:
            continue  # 이미 더 짧은 거리로 처리된 정점
        for nxt, cost in graph[v]:
            nd = d + cost
            if nd < dist[nxt]:
                dist[nxt] = nd
                heapq.heappush(heap, (nd, nxt))
    return dist


# 2) 플로이드-워셜: 모든 정점 쌍 사이의 최단 거리 (정점 수가 적을 때)
def floyd_warshall(n, edges):
    dist = [[INF] * (n + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        dist[i][i] = 0
    for a, b, cost in edges:
        dist[a][b] = min(dist[a][b], cost)
    for k in range(1, n + 1):          # 거쳐 가는 정점 k 가 가장 바깥!
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist


if __name__ == '__main__':
    # 백준 1753 예제: 방향 그래프, 정점 5개
    n = 5
    edges = [(5, 1, 1), (1, 2, 2), (1, 3, 3), (2, 3, 4), (2, 4, 5), (3, 4, 6)]
    graph = [[] for _ in range(n + 1)]
    for a, b, cost in edges:
        graph[a].append((b, cost))

    dist = dijkstra(graph, 1)
    print(['INF' if d == INF else d for d in dist[1:]])  # [0, 2, 3, 7, 'INF']

    fw = floyd_warshall(n, edges)
    print(fw[1][4], fw[5][4])  # 7 8
