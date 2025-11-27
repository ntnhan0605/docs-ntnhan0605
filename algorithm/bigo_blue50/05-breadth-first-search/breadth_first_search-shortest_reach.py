"""
input
2
4 2
1 2
1 3
1
3 1
2 3
2
output
6 6 -1
-1 6

input
1
50 49
1 44
1 28
1 42
1 45
1 23
1 24
1 19
1 27
1 12
1 22
1 48
1 41
1 46
1 11
1 38
1 8
1 9
1 13
1 25
1 49
1 20
1 29
1 15
1 17
1 35
1 43
1 50
1 2
1 7
1 34
1 32
1 40
1 47
1 5
1 39
1 21
1 3
1 18
1 37
1 10
1 30
1 6
1 14
1 33
1 36
1 16
1 31
1 26
1 4
22
output
6 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 12 
"""
import queue

def breadth_first_search_shortest_reach(S, graph, visited, dist):
	q = queue.Queue()
	q.put(S)
	dist[S] = 0
	visited[S] = True
	while not q.empty():
		u = q.get()
		for v in graph[u]:
			if visited[v] == False:
				dist[v] = dist[u] + 1
				visited[v] = True
				q.put(v)
	for i in range(1, len(dist)):
		if dist[i] == -1:
			print("-1", end = ' ')
		elif dist[i] != 0:
			print(str(dist[i] * 6), end = ' ')
	print()
	
	

q = int(input())
for testcase in range(1, q + 1):
	[n, m] = list(map(int, input().split()))
	dist = [-1 for _ in range(0, n + 1)]
	graph = [[] for _ in range(0, n + 1)]
	visited = [False for _ in range(0, n + 1)] 
	for i in range(m):
		[u, v] = list(map(int, input().split()))
		graph[u].append(v)
		graph[v].append(u)
	s = int(input()) # root
	breadth_first_search_shortest_reach(s, graph, visited, dist)