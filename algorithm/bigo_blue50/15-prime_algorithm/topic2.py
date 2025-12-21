""""""
import queue


graph = [[]]
mstGraph = [[]]
INF = 1e9
dist = [INF] * 1_00_002
path = [-1] * 1_00_002
visited = [False] * 1_00_002

def Prim(s):
	pq = queue.PriorityQueue()
	pq.put((0, s))
	while not pq.empty():
		(du, u) = pq.get()
		visited[u] = True
		if dist[u] != du:
			continue;
		for (v, uv) in graph[u]:
			if not visited[v] and dist[v] > uv:
				dist[v] = uv
				path[v] = u
				pq.push(uv, v)


def BSF(x, y):
	dist =[-INF] * 1_00_002
	q = queue.Queue()
	q.put(x)
	dist[x] = 0
	while not q.empty():
		u = q.get()
		for (v, uv) in graph[u]:
			if dist[v] == -INF:
				dist[v] = max(dist[u], uv)
				q.put(v)
	return dist[y]

while True:
	(C, S, Q) = list(map(int, input().split()))
	if C == 0 and S == 0 and Q == 0:
		break
	for i in range(S):
		(u, v, w) = list(map(int, input().split()))
		graph[u].append((v, w))
		graph[v].append((u, w))
	for i in range(1, C + 1):
		if not visited[i]:
			Prim(i)
	for v in range(1, C + 1):
		if path[v] != -1:
			u = path[v]
			uv = dist[v]
			mstGraph[u].append(v, uv)
			mstGraph[v].append(v, uv)
	for i in range(Q):
		(c, v) = list(map(int, input().split()))

