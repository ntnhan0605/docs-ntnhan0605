"""
4 2
1 3
2 3 4

4
0
1
2
"""

"""
7 4
2 2 3
1 6
1 7
2 1 2

4
7
1
5
0
2
3
"""


def DFS(u, graph, visited, result):
	visited[u] = True
	for v in graph[u]:
		if not visited[v]:
			DFS(v, graph, visited, result)
	result.append(u)

def topologicalSortDFS(graph, result, N):
	visited = [False] * (N + 1)
	for i in range(1, N + 1):
		if not visited[i]:
			DFS(i, graph, visited, result)
	result.reverse()


N, K = map(int, input().split())
graph = [[] for i in range(N + 1)]
result = []
for i in range(1, K + 1):
	li = list(map(int, input().split()))
	for j in range(li[0]):
		graph[i].append(li[j + 1])

# print(graph)
topologicalSortDFS(graph, result, N)
# print(result)

ans = [0] * (N + 1)
for i in range(1, len(result)):
	ans[result[i]] = result[i - 1]

for i in range(1, len(ans)):
	print(ans[i])


"""
35 1
1 30

2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
31
1
32
33
34
35
0
"""