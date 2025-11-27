"""
input
7
0 1 4
0 3 8
1 4 1
1 2 2
4 2 3
2 5 3
3 4 2
0
4
1
4
5
7
output
4
5
9
NO PATH
"""
import queue
n = int(input())

graph = [[] for _ in range(501)]
dist = [float('inf')] * 501

for _ in range(n):
	[u, v, w] = list(map(int, input().split()))
	graph[u].append([v, w])
	graph[v].append([u, w])

def dijkstra(root, dist):
	dist[root] = 0
	pq = queue.PriorityQueue()
	pq.put([0, root])
	while not pq.empty():
		[distance, u] = pq.get()
		if dist[u] > distance:
			break
		for (v, w) in graph[u]:
			if distance + w < dist[v]:
				dist[v] = distance + w
				pq.put([dist[v], v])

root = int(input())
dijkstra(root, dist)

q = int(input())
for _ in range(q):
	v = int(input())
	print(dist[v] if dist[v] != float('inf') else 'NO PATH' )

