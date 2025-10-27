"""
- Recursion case : n // 10
- Base case/exit case : n < 10
"""

def theFirstDigit(n):
	if n < 10:
		return n
	return theFirstDigit(n // 10)

n = int(input())
print(theFirstDigit(abs(n)))