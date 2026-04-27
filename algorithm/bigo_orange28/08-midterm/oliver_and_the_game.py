# This will make time exceed
# N = int(input())
# toward_edges = [[] for _ in range(N)]
# away_edges = [[] for _ in range(N)]
# for _ in range(N - 1):
# 	u, v = map(int, input().split())
# 	toward_edges[u - 1].append(v - 1)
# 	away_edges[v - 1].append(u - 1)

# def bfs(u, target, edges, N):
# 	visited = [False] * N
# 	queue = [u]
# 	visited[u] = True
# 	while queue:
# 		current = queue.pop(0)
# 		if current == target:
# 			return True
# 		for v in edges[current]:
# 			if not visited[v]:
# 				visited[v] = True
# 				queue.append(v)
# 	return False

# Q = int(input())
# queries = []
# for _ in range(Q):
# 	t, u, v = map(int, input().split())
# 	queries.append((t, u, v))
# for t, u, v in queries:
# 	u -= 1
# 	v -= 1
# 	if t == 0:
# 		visited = bfs(u, v, toward_edges, N)
# 		print("YES" if visited else "NO")
# 	else:
# 		visited = bfs(u, v, away_edges, N)
# 		print("YES" if visited else "NO")

time = 0
st = []
en = []
adj = [[]]
def dfs(u, prev):
	time += 1
	st[u] = time
	for v in adj[u]:
		if v == prev:
			continue
		dfs(v, u)
	en[u] = time
	time += 1



"""
Oliver and the Game
9
1 2
1 3
2 6
2 7
6 9
7 8
3 4
3 5
5
0 2 8
1 2 8
1 6 5
0 6 5
1 9 1
----
YES
NO
NO
NO
YES
"""