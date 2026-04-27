
	


T = int(input())
for _ in range(T):
	h, w = list(map(int, input().split()))
	db = [[-1] * w] * h
	ans = 0
	for i in range(w):
		ans = max(ans, f(1, i))

	print(ans)

def f(x, y, n, a):
	if x > n:
		return 0
	if db[x][y] != -1:
		return db[x][y]
	ans = 0
	for d in range(-1, 1):
		newRow = x + 1
		newCol = y + d

		if newCol >= 1 and newCol <= n:
			ans = max(ans, f(newRow, newCol))

	ans += a[x][y]
	db[x][y] = ans

	return ans

"""
1
6 5
3 1 7 4 2
2 1 3 1 1
1 2 2 1 8
2 2 1 5 3
2 1 4 4 4
5 2 7 5 1
----
32
"""