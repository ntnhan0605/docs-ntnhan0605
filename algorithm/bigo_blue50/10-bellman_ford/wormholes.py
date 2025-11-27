"""
input
2
3 3
0 1 1000
1 2 15
2 1 -42
4 4
0 1 10
1 2 20
2 3 30
3 0 -60
output
possible
not possible
"""
import math;

class Edge:
	def __init__(self, x, y, t):
		self.source = x
		self.target = y
		self.weight = t

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

tc = int(input())
for _ in range(tc):
	(n, m) = list(map(int, input().split()))
	graph = []
	for i in range(m):
		(x, y, t) = list(map(int, input().split()))
		graph.append(Edge(x, y, t))

	if BellmanFord(0, graph, n, m):
		print('not possible')
	else:
		print('possible')
