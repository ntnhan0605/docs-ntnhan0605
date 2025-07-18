n = int(input())

def PalindromeNumber(n):
	palindrome = str(n) == str(n)[::-1]
	if palindrome:
		return 'YES'
	else:
		return 'NO'

print(PalindromeNumber(n))