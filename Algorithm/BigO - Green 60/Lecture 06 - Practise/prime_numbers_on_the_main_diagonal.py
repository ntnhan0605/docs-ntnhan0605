n = int(input())

a = []
for i in range(n):
	ai = list(map(int, input().split()))
	a.append(ai)

def isPrime(num):
	if num == 1:
		return False
	for i in range(2, int(num ** 0.5) + 1):
		if num % i == 0:
			return False
	return True

c = 0
for i in range(0, n):
	aii = a[i][i]
	if isPrime(aii):
		c += 1

print(c)
