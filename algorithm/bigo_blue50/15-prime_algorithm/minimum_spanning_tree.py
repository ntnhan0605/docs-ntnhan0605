"""
input
4 5
1 2 10
2 3 15
1 3 5
4 2 2
4 3 40
output
17
"""
import math
from queue import PriorityQueue


class Node:
	def __init__(self, id, weight):
		self.id = id
		self.weight = weight
(n, m) = list(map(int, input().split()))
graph = [[]]
for i in range(m):
	(u, v, w) = list(map(int, input().split()))
	graph[i].append(Node(v, w))

def prim(s):
	dist = [math.inf] * (n + 1)
	visited = [False] * (n + 1)
	pq = PriorityQueue()
	pq.put(Node(s, 0))
	dist[s] = 0
	while not pq.empty():
		top = pq.get()
		u = top.id
		if visited[u]: continue
		visited[u] = True
		for neighbor in graph[u]:
			(id, weight) = neighbor
			