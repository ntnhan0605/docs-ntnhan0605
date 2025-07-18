n = int(input())

def LagestDigit(n):
	mx = 0
	while(n > 0):
		compare = n % 10
		if compare > mx:
			mx = compare
		n //= 10
	return mx

print(LagestDigit(n))