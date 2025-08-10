n = int(input())
s = 0

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


for i in range(1, n):
	if (isPrime(i)):
		s += i

print(s)
