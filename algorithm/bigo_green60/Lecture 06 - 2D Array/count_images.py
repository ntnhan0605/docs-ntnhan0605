m, n = map(int, input().split())

a = []
for i in range(0, m):
	ai = list(map(int, input().split()))
	a.append(ai)

count = 0
for i in range(0, m):
	for j in range(0, n):
		aij = a[i][j]
		if aij > 100:
			count += 1

print(count)
