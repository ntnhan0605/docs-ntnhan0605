# UCLN
"""
- Recursion case : reminder = a % b and a = b and b = reminder
- Base case/Exit case : b = 0
"""

def greatest_common_divisor(a, b):
	if b == 0:
		return a
	reminder = a % b
	a = b
	b = reminder
	return greatest_common_divisor(a, b)

a , b = map(int, input().split())

print(greatest_common_divisor(a, b))