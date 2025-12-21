"""
------input------
7
Isenbaev Oparin Toropov
Ayzenshteyn Oparin Samsonov
Ayzenshteyn Chevdar Samsonov
Fominykh Isenbaev Oparin
Dublennykh Fominykh Ivankov
Burmistrov Dublennykh Kurpilyanskiy
Cormen Leiserson Rivest
------output------
Ayzenshteyn 2
Burmistrov 3
Chevdar 3
Cormen undefined
Dublennykh 2
Fominykh 1
Isenbaev 0
Ivankov 2
Kurpilyanskiy 3
Leiserson undefined
Oparin 1
Rivest undefined
Samsonov 2
Toropov 1
"""

"""						

"""
import queue

n = int(input())
nodes = dict()
graph = [[] for _ in range(3 * n)]
dist = [-1] * (3 * n)

def BFS(root):
	dist[root] = 0
	q = queue.Queue()
	q.put(root)
	while not q.empty():
		u = q.get()
		for v in graph[u]:
			if dist[v] == -1:
				dist[v] = dist[u] + 1
				q.put(v)

index = 0
for i in range(n):
	team = list(input().split())
	for j in range(3):
		if not (team[j] in nodes):
			nodes[team[j]] = index
			index = index + 1
	a = nodes.get(team[0])
	b = nodes.get(team[1])
	c = nodes.get(team[2])
	graph[a].append(b)
	graph[a].append(c)
	graph[b].append(a)
	graph[b].append(c)
	graph[c].append(a)
	graph[c].append(b)

if not ("Isenbaev" in nodes):
	nodes['Isenbaev'] = index
BFS(nodes.get("Isenbaev"))
 
nodes = dict(sorted(nodes.items()))

for (key, idx) in nodes.items():
	if idx != index:
		print(f'{key} {"undefined" if dist[idx] == -1 else dist[idx]}')
