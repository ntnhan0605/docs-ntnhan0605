def isMaxRow(a, r, c, n):
	for k in range(n):
		if a[r][k] > a[r][c]:
			return False
	return True

def isMinCol(a, r, c, m):
	for k in range(m):
		if a[k][c] < a[r][c]:
			return False
	return True

def isSaddle(a, r, c, m, n):
	return True if isMaxRow(a, r, c, n) and isMinCol(a, r, c, m) else False

m, n = map(int, input().split())
a = []
for i in range(0, m):
	ai = list(map(int, input().split()))
	a.append(ai)

count = 0
for i in range(m):
	for j in range(n):
		if isSaddle(a, i, j, m, n):
			count += 1

print(count)

"""
B1 : Kiểm tra lớn nhất trên 1 dòng
B2 : Kiểm tra nhỏ nhất trên 1 cột
B3 : Kiểm trả cả B1 và B2 isSaddle
B4 : Count với kiểm tra isSaddle
"""