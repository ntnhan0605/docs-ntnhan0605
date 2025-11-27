"""
input
4 6
X...XX
...XX.
.X..X.
......
1 6
2 2
output
YES

input
5 4
.X..
...X
X.X.
....
.XX.
5 3
1 1
output
NO

input
4 7
..X.XX.
.XX..X.
X...X..
X......
2 2
1 6
output
YES
"""
import queue

dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]

[n, m] = list(map(int, input().split()))
matx = [['' * (m + 1)] * (n + 1)]
for i in range(n):
	matxi = input()
	for j in range(0, m):
		matx.append(matxi[j])
r1, c1 = list(map(int, input().split()))
r2, c2 = list(map(int, input().split()))

def isValid(x, y, n, m):
	return 0 < x <= n and 0 < y <= m
def ice_cave(matx, n, m, r1, c1, r2, c2):
	r1 -= 1
	c1 -= 1
	r2 -= 1
	c1 -= 1

	matx[r1][c1] = 'X'
	q = queue.Queue()
	q.put([r1, c1])
	while not q.empty():
		[ux, uy] = q.get()
		for i in range(4):
			[vx, vy] = [ux + dx[i], uy + dy[i]]
			if isValid(vx, vy, n, m):
				if vx == r2 and vy == c2 and matx[r2][c2] == 'X':
					return True
				if matx[vx][vy] == '.':
					q.put([vx, vy])
					matx[vx][vy] = 'X'
	return False


if ice_cave(matx, n, m, r1, c1, r2, c2):
	print('YES')
else:
	print('NO')