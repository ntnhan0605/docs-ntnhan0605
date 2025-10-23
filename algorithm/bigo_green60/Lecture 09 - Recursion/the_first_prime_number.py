"""
- Recursion case : index + 1
- Exit case :
	- index == len(arr)
	- is_prime(arr[i])
"""

def is_prime(n, divisor = 2):
	if n < 2:
		return False
	if divisor * divisor > n :
		return True
	if n % divisor == 0:
		return False
	return is_prime(n, divisor + 1)

def the_first_prime_number_recursion(arr, start, end):
	if start > end: 
		return -1
	if start == end:
		return start if is_prime(arr[start]) else -1
	mid = (start + end) // 2
	left_result = the_first_prime_number_recursion(arr, start, mid)
	if left_result != -1:
		return left_result
	return the_first_prime_number_recursion(arr, mid + 1, end)

n = int(input())
arr = list(map(int, input().split()))

print(the_first_prime_number_recursion(arr, 0, len(arr) - 1))

