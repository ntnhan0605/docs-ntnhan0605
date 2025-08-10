def theLargestDigit(n, max = 0):
	if n < 10:
		return max if max > n else n
	digit = n % 10
	if max < digit:
		max = digit
	return theLargestDigit(n // 10, max)

n = int(input())
print(theLargestDigit(abs(n)))