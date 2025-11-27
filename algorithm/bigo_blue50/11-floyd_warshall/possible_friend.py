"""
input
3
NYN
YNY
NYN
NYYY
YNNY
YNNN
YYNN
NNYNNNN
NNYNNNN
YYNYNNN
NNYNYNN
NNNYNYY
NNNNYNN
NNNNYNN
output
0 1
2 2
3 4

"""

import math


tc = int(input())


def FloydWarshall(dist, M):
	for k in range(M):
		for i in range(M):
			if dist[i][k] == math.inf: continue
			for j in range(M):
				if dist[k][j] == math.inf:
					continue
				if dist[i][j] > dist[i][k] + dist[k][j]:
					dist[i][j] = dist[i][k] + dist[k][j]
	
for _ in range(tc):
	line = input()
	M = len(line)
	dist = [[math.inf] * M] * M
	for j in range(M):
		if line[j] == 'Y':
			dist[0][j] = 1
	for i in range(1, M):
		s = input()
		for j in range(M):
			if s[j] == 'Y':
				dist[i][j] = 1
	FloydWarshall(dist, M)
	minId = -1
	maxPossibleFriend = -1
	for i in range(M):
		p = 0
		for j in range(M):
			if dist[i][j] == 2:
				p += 1
		if p > maxPossibleFriend:
			minId = i
			maxPossibleFriend = p
	print(minId, maxPossibleFriend)

	

