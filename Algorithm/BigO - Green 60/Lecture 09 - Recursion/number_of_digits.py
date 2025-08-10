"The number of digits"
"""
- Recusion case : count number
- Base case : length of string
"""

def countNumberOfDigit(number, total):
	if number < 10:
		return total + 1
	return countNumberOfDigit(number // 10, total + 1)
	
n = int(input())

print(countNumberOfDigit(abs(n), 0))