n = int(input())

a = list(map(int, input().split()))

def isPrime(n):
	if n > 1:
		flag = True
		for i in range(2, int(n ** 0.5) + 1):
			if n % i == 0:
				flag = False
				break
		return flag
	else:
		return False

b = []
for i in range(0, n):
	ai = a[i]
	if ai < 0:
		continue
	if isPrime(ai):
		b.append(ai)

print(len(b))