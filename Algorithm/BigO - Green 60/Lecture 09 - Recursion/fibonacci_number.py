"""
- Recursion case : f(n -1) + f(n-2)
- Exit case : n == 0 or n == 1
"""

def fibonacci_number(n):
	if n == 0 or n == 1:
		return 1
	return fibonacci_number(n - 1) + fibonacci_number(n - 2)

n = int(input())
print(fibonacci_number(n))