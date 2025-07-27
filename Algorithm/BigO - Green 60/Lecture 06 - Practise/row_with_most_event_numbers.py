m, n = map(int, input().split())

a = []
for i in range(0, m):
	ai = list(map(int, input().split()))
	a.append(ai)

def isEven(number):
	return number % 2 == 0

c = 0
rowIndex = 0
for i in range(0, m):
	ci = 0
	for j in range(0, n):
		aij = a[i][j]
		if isEven(aij):
			ci += 1
	if c < ci:
		c = ci
		rowIndex = i

print(rowIndex)