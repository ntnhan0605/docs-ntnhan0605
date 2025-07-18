n = int(input())

def isPrime(number):
	if (number != 1):
		c = 1
		for i in range(2, int(number ** 0.5) + 1):
			if (number % i == 0):
				c+=1
		if (c >= 2):
			return False
		else:
			return True	
	return False

def PrimeClosestToN(n):
	mx = 1
	mi = n
	for i in range(n, 0, -1):
		down = i
		if isPrime(i):
			mi = i
			break
		up = 2 * n - i
		if isPrime(up):
			mx = up
			break

	if (mx - n > n - mi):
		return mx
	
	return mi
	

print(PrimeClosestToN(n))