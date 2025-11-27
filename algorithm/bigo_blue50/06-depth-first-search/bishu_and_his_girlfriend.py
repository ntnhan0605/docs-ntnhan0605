"""
input
6
1 2
1 3
1 4
2 5
2 6
4
5
6
3
4
output
3

input
10
1 8
8 7
1 4
7 3
8 9
9 2
7 10
3 5
1 6
4
6
5
8
7
output
6
"""
import sys;
sys.setrecursionlimit(1_00_000)
NUM = 1_000 + 5
n = int(input())
graph = [[] for _ in range(NUM)]
dist = [-1] * NUM
visited = [False] * NUM

def DFS(u):
	visited[u] = True
	for v in graph[u]:
		if not visited[v]:
			dist[v] = dist[u] + 1
			DFS(v)

for _ in range(n - 1):
	[u, v] = list(map(int, input().split()))
	graph[u].append(v)
	graph[v].append(u)

Q = int(input())

DFS(1)
ans = 0
min_dist = NUM
for i in range(Q):
	u = int(input())
	if min_dist > dist[u] or (min_dist == dist[u] and ans > u):
		min_dist = dist[u]
		ans = u
print(ans)