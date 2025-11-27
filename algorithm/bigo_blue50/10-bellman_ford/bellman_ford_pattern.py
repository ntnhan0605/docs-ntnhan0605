import math


def BellmanFord(s, graph, n, m):
	dist = [math.inf] * n
	dist[s] = 0
	for i in range(n):
		for j in range(m):
			u = graph[j].source
			v = graph[j].target
			w = graph[j].weight
			if dist[u] != math.inf and dist[u] + w < dist[v]:
				dist[v] = dist[u] + w
	
	for j in range(m):
		u = graph[j].source
		v = graph[j].target
		w = graph[j].weight
		if dist[u] != math.inf and dist[u] + w < dist[v]:
			return False
	return True