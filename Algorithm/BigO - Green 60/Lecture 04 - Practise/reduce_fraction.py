a, b = map(int, input().split())

def GreatestCommonDenomiator(a, b):
	mi = min(a, b)
	ucln = 1
	for i in range(1, mi + 1):
		if (a % i == 0 and b % i == 0):
			ucln = i
	return ucln

ucln = GreatestCommonDenomiator(a, b)
print(a // ucln, b // ucln)