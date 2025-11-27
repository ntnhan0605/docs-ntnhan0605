"""
input
10 10
9
0 1 2
1 1 2
2 2 2 9
3 2 1 7
5 3 3 6 9
6 4 0 1 2 7
7 3 0 3 8
8 2 7 9
9 3 2 3 4
0 0
9 9
0 0
output
18
"""

(R, C) = list(map(int, input().split()))
n = int(input())
adj = [[0] for _ in range(C)] * R
for i in range(n):
	rows = list(map(int, input().split()))
	for j in range(rows[1]):
		adj[rows[0]][rows[j+2]] = 1
print(adj)
