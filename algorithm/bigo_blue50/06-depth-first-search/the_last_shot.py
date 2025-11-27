"""
input
4 3
1 2
2 4
1 3
output
4

input
4 3
1 2
2 1
2 3
output
3

"""
# WAIT_FOR_RESPONSE
[n, m] = list(map(int, input().split()))
graph = [[] for _ in range(n + 1)]

for i in range(m):
	[u, v] = list(map(int, input().split()))
	graph[u].append(v)

def dfs(s): # number of bombs that can be reached # Cannot use Recursive
	visited = [False] * (n + 1)
	stcks = [s]
	visited[s] = True
	count = 0
	while len(stcks) != 0:
		u = stcks.pop()
		count += 1
		for v in graph[u]:
			if not visited[v]:
				stcks.append(v)
				visited[v] = True
	return count

answer = -1
for i in range(1, n + 1):
	answer = max(answer, dfs(i))
print(answer)