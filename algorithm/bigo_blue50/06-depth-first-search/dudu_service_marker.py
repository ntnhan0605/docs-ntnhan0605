"""
input
3
2 1
1 2
2 2
1 2
2 1
4 4
2 3
3 4
4 2
1 3
output
NO
YES
YES
"""
graph = [[]] * 1_002

def dfs(u):
	flag[u] = True
	visited[u] = True
	for v in graph[u]:
		if visited[v] == True:
			return 'YES'
		else:
			dfs(v)
	visited[u] = False
	return 'NO'

T = int(input())
for i in range(T):
	[N, M] = list(map(int, input().split()))
	graph = [[] for _ in range(N + 1)]
	for i in range(M):
		[u, v] = list(map(int, input().split()))
		graph[u].append(v)
	flag = [False] * 1_002
	visited = [False] * 1_002
	for i in range(1, N + 1):
		if not flag[i]:
			print(dfs(i))


