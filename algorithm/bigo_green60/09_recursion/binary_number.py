"""
Convert Dec -> Bin
n = 20 / 2 = 10 -> m = 0
n = 10 / 2 = 5 -> m = 0
n = 5 / 2 = 2	-> m = 1
n = 2 / 2 = 1	-> m = 0
n = 1 / 2 = 0 -> m = 1
Result -> 0 1 0 0

- Recursion case : bin(n // 2) + "mod"
- Base case/Exit case : n == 0
"""
# Binary số nhị phân
def binary_number(n):
	if n == 0:
		return ""
	return binary_number(n // 2) + f"{n % 2}"

n = int(input())

if n == 0 or n == 1:
  print(n)
else:
  print(binary_number(n))