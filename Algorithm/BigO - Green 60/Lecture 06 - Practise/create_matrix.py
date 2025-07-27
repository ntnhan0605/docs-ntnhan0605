n, m = map(int, input().split())
a, b, p = map(int, input().split())
mat = [[0 for _ in range(m)] for __ in range(n)]

for i in range(n):
	for j in range(m):
		if i == 0 and j == 0:
			mat[i][j] = a
		elif i == 0 and j == 1:
			mat[i][j] = b
		else:
			c = (a + b) % p
			mat[i][j] = c
			a = b
			b = c

for i in range(n):
	for j in range(m):
		print(mat[i][j], end = " ")
	print()

"""
m = 3, n = 3
(0,0) = (a + 0) % 1
(0,1) = (b + 0) % 1
(0,2) = ((0,0) + (0,1)) % p
(1,1) = ((1, 0) + (0, 2)) % p
Row: (0,0) -> (0, 1) -> (0, 2) -> (0, 3) -> (0, n - 1)
(1, 0) -> (0, n - 2) và (0, n - 1)
Lưu lại 2 giá trị trước đó


a = 1; b = 1
c = a + b
mat[i][j] = c
a = b
b = c
(a = 2; b = 1)

"""
