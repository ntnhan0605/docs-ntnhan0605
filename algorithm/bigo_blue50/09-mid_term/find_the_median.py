"""
input
7
0 1 2 4 6 5 3
output
3
"""

n = int(input())
arr = list(map(int, input().split()))

def find_the_median(arr, n):
	arr.sort()
	print(arr)
	if n % 2 == 0:
		i = int(arr / 2)
		ii = i + 1
		return (arr[i] + arr[ii]) / 2
	return arr[int(n / 2)]

print(str(find_the_median(arr, n)))