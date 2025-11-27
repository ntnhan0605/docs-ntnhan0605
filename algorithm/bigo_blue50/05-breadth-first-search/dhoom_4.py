"""
input
3 30
3
2 5 7
output
2
"""
import queue
def dhoom_4(arr, n, x, z):
	q = queue.Queue()
	dist = [-1] * 1_00_001
	q.put(x)
	dist[x] = 0
	while not q.empty():
		u = q.get()
		for i in range(n):
			v = (u * arr[i]) % 1_00_000
			if dist[v] == -1:
				dist[v] = dist[u] + 1
				if v == z:
					return dist[z]
				q.put(v)
	return dist[z]

[x, z] = list(map(int, input().split()))
n = int(input())
graph = list(map(int, input().split()))

print(dhoom_4(graph, n, x, z))
