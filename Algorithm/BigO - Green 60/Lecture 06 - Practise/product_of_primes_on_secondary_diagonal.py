n = int(input())

a = []
for i in range(0, n):
	ai = list(map(int, input().split()))
	a.append(ai)

def isPrime(n):
	if n == 1:
		return False
	for i in range(2, int(n ** 0.5) + 1):
		if n % i == 0:
			return False
	return True

p = 1
for i in range(0, n):
	aii1 = a[i][n - i - 1]
	if isPrime(aii1):
		p *= aii1

print(p % 1000003)