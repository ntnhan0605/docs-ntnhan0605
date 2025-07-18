n = int(input())

def NumberOfDigits(n):
	length = 0
	while(n > 0):
		n //= 10
		length += 1
	return length

print(NumberOfDigits(n))
