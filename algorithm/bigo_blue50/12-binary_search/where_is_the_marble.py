"""
input
4 1
2
3
5
1
5
5 2
1
3
3
3
1
2
3
0 0
output
CASE# 1:
5 found at 4
CASE# 2:
2 not found
3 found at 3


"""
def BinarySearchFirst(a, left, right, x):
	if left <= right:
		mid = (left + right) // 2
		if (mid == left or x != a[mid - 1]) and a[mid] == x:
			return mid
		elif x > a[mid]:
			return BinarySearchFirst(a, mid + 1, right, x)
		else:
			return BinarySearchFirst(a, left, mid - 1, x)
	return -1



tc = 1
while True:
	(N, Q) = list(map(int, input().split()))
	if N == 0 and Q == 0:
		break
	arr = []
	for i in range(N):
		arr.append(int(input()))
	arr.sort()
	print(f'CASE# {tc}:')
	for _ in range(Q):
		x = int(input())
		index = BinarySearchFirst(arr, 0, N - 1, x)
		if index == -1:
			print(f'{x} not found')
		else:
			print(f'{x} found at {index + 1}')
	tc += 1