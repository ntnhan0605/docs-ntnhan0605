"""
input
2
4 12
9 -3 4 3
5 -9
-7 3 -2 8 7
output
1
1

-3 3 4 9

"""


tc = int(input())
for _ in range(tc):
	(n, m) = list(map(int, input().split()))
	arr = list(map(int, input().split()))
	arr.sort()
	c = 0
	left = 0
	right = n - 1
	while left <= right:
		curSum = arr[left] + arr[right]
		if curSum == m:
			c = c + 1
			left = left + 1
			right = right - 1
		elif curSum > m:
			right = right -1
		else:
			left = left + 1
	print(c)