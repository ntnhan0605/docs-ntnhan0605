"""
6 2
5 3
0
0
0
2 2 1
1 4
1 5

5
1 2 3 4 5 
---------
9 3
3 9 5
0
0
3 9 4 5
0
0
1 8
1 6
1 2
2 1 2

6
1 2 9 4 5 3
---------
3 3
1 2 3
1 2
1 3
1 1

-1
"""

result = []
hasCycle = False
def dfs(u, graph, visited):
	if visited[u] == 0:
		visited[u] = 1
		for v in graph[u]:
			dfs(v, graph, visited)
		visited[u] = 2
		result.append(u)
	if visited[u] == 1:
		hasCycle = True


n, k = map(int, input().split())
graph = [[]]
visited = []
mainCourses = []
for i in range(k):
	mainCourses[i] = int(input())

for u in range(n):
	t = int(input())
	for j in range(t):
		v = int(input)
		graph[u].append(v)
for i in range(k):
	if visited[mainCourses[i]] == 0:
		dfs(mainCourses[i], graph)
if hasCycle:
	print(-1)
else:
	print(len(result))
	print(str.join(' ', result))
