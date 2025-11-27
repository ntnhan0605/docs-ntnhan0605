"""

"""
import math


class Edge:
	def __init__(self, s,t, w):
		self.source = s
		self.target = t
		self.weight = w

dist = [math.inf] * 1_001
marked = [False] * 1_001 
graph = [[]]
edgeList = []

def DFS(u):
	marked[u] = True
	for v in graph[u]:
		if marked[v] == False:
			DFS(v)

def BellmanFord(s):
	dist[s] = 0
	for i in range(n):
		for edge in edgeList:
			if dist[edge.source] != math.inf and dist[edge.target] > dist[edge.source] + edge.weight:
				dist[edge.source] = dist[edge.source] + edge.weight
		
	for e in edgeList:
		if dist[e.source] != math.inf and dist[e.target] > dist[e.source] + e.weight:
			DFS(e.source)

while True:
	(n, m, q, s) = list(map(int, input().split()))

	if n == 0 and m == 0 and q == 0 and s == 0:
		break

	graph = [[]]
	edgeList = []
	for i in range(m):
		(u, v, w) = list(map(int, input().split()))
		graph[u].append(v)
		edgeList.append(Edge(u, v, w))

		BellmanFord(s)

		for i in range(q):
			u = int(input())
			if dist[u] == math.inf:
				print('Impossible')
			elif marked[u] == True:
				print('-Infinity')
			else:
				print(dist[u])

	# Reset all global variable after every case for save memory
	dist = [math.inf] * 1_001
	marked[i] = [False] * 1_001
	graph = [[]]
	edgeList = []
