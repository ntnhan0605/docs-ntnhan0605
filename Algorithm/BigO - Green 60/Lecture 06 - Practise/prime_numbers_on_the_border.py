m, n = map(int, input().split())

a = []
for i in range(0, m):
	ai = list(map(int, input().split()))
	a.append(ai)

def isPrime(n):
	if n == 1:
		return False
	flag = True
	for i in range(2, int(n ** 0.5 + 1)):
		if n % i == 0:
			flag = False
	return flag

count = 0
for i in range(0, m):
	for j in range(0, n):
		aij = a[i][j]
		isBorder = i == 0 or i == m - 1 or j == 0 or j == n - 1
		if isBorder:
			if isPrime(aij):
				count += 1

print(count)


