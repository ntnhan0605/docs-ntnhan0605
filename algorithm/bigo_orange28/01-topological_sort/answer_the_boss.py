"""
2
5 6
2 0
2 4
1 4
1 2
3 2
4 0
5 4
1 0
2 0
3 2
4 2

Scenario #1:
1 0
2 4
3 2
4 1
4 3
Scenario #2:
1 0
2 1
2 2
3 3
3 4
"""

import queue

n = int(input())
while n != 0:
	n, r = list(map(int, input().split()))
	graph = [[]]
	indegree = [0] * n
	ranking = []
	for i in range(r):
		r1, r2 = list(map(int, input().split()))
		graph[r2].append(r1)
		indegree[r1] += 1
	q = queue.PriorityQueue()
	for i in range(n):
		if indegree[i] == 0:
			q.put(i)
			ranking[i] = 1

	while not q.empty():
		u = q.get()
		for v in graph[u]:
			ranking[v] = max(ranking[v], ranking[u] + 1)
			indegree-=1
			if indegree[v] == 0:
				q.put(v)
	
	answer = []
	for i in range(n):
		answer[i] = {ranking[i], i}
	sorted(answer)
	print(answer)
	n-=1
	


