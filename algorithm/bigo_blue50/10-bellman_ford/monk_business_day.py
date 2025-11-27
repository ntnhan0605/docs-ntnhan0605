"""
input
2
5 6
1 2 2
2 3 -1
3 4 -7
4 5 0
2 3 -7
3 5 6
5 8
1 5 10
2 3 -6
5 2 5
4 5 9
1 5 1
2 4 -10
2 3 -2
4 1 1
output
No
Yes
"""

import math


class Edge:
	def __init__(self, s,t,w):
		self.source= s
		self.target = t
		self.weight = w

def BellmanFord(n, m, edges):
	dist = [math.inf] * (n + 1)
	for i in range(n):
		for j in range(m):
			(u, v, w) = (edges[j].source, edges[j].target, edges[j].weight)
			if dist[u] != math.inf and dist[v] > dist[u] + w:
				dist[v] = dist[u] + 1

	for j in range(m):
		(u, v, w) = (edges[j].source, edges[j].target, edges[j].weight)
		if dist[u] != math.inf and dist[v] > dist[u] + w:
			return True
	return False


tc = int(input())
for _ in range(tc):
	(n, m) = list(map(int, input().split()))
	edges = []
	for i in range(m):
		(s, t, w) = list(map(int, input().split()))
		edges.append(Edge(s, t, -w))

	if BellmanFord(n, m, edges) == True:
		print('Yes')
	else:
		print('No')