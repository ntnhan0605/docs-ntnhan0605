"""
input
2
4
1 2 100
2 3 200
3 4 1600
1 3 2100
3
1 10 2000
2 5 100
6 9 400
output
3700
2000
"""

dist = [[] * 50] * 50

def FloydWarshall():
	for k in range(49):
		for i in range(49):
			for j in range(49):
				



tc = int(input())
for _ in range(tc):
	n = int(input())
	for i in range(49):
		for j in range(49):
			if i > j:
				dist[i][j] = -1e9
			else:
				dist[i][j] = 0
	for i in range(n):
		(u, v, w) = list(map(int,input().split()))
		dist[u][v] = max(dist[u][v], w)
	
	print(dist[0][48])
	
	