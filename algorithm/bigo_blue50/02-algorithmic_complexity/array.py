"""
input
4 2
1 2 2 3
output
1 2

input
8 3
1 1 2 2 3 3 4 5
output
2 5

input
7 4
4 7 7 4 7 4 7
output
-1 -1


"""
[n, k] = list(map(int, input().split()))
arr = list(map(int, input().split()))

def array(arr, n, k):
	# Two pointers
	count = [0] * (n * 2 + 1)
	unique = 0
	for i in range(n):
		if count[arr[i]] == 0:
			unique += 1 # count unique value
		count[arr[i]] += 1
		if unique == k:
			j = 0
			while True:
				if count[arr[j]] > 1:
					count[arr[j]] -= 1 # remove same value
					j += 1
				else:
					print(f'{j + 1} {i + 1}')
					exit()
	print("-1 -1")

array(arr, n, k)