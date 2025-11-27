"""
input
7 9
0 6
0 1 1
0 2 1
0 3 2
0 4 3
1 5 2
2 6 4
3 6 2
4 6 4
5 6 1
4 6
0 2
0 1 1
1 2 1
1 3 1
3 2 1
2 0 3
3 0 2
6 8
0 1
0 1 1
0 2 2
0 3 3
2 5 3
3 4 2
4 1 1
5 1 1
3 0 1
0 0
output
5
-1
6
"""

def dijkstra(root, graph):
	pass

while True:
	(n, m) = list(map(int, input().split()))
	if n == 0 and m == 0 :
		break
	graph = [[]]
	graph_rev = [[]]
	graph_new = [[]]
	(S, D) = list(map(int, input().split()))
	for i in range(m):
		(u, v, p) = list(map(int, input().split()))
		graph[u].append((v, p))
		graph_rev[v].append((u, p))

	distS = dijkstra(S, graph)
	distD = dijkstra(D, graph_rev)

	shortest_path = distS[D]
	for u in range(n):
		for (v, p) in graph[u]:
			if distS[u] + p + distD[v] != shortest_path:
				graph_new[u].append((v, p))
		
