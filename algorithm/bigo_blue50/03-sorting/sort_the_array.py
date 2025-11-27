"""
input
3
3 2 1
output
yes
1 3

i = 0 => arr[0] = 3 | arrSorted[0] = 1
i = 1 => arr[1] = 2 | arrSorted[1] = 2
i = 2 => arr[2] = 1 | arrSorted[2] = 3


input
4
2 1 3 4
output
yes
1 2

input
4
3 1 2 4
output
no

input
2
1 2
output
yes
1 1
"""

n = int(input())
arr = list(map(int, input().split()))

def sort_the_array(ar, n):
	arsorted = sorted(ar)

	l = r = -1
	for i in range(n):
		if ar[i] != arsorted[i]:
			if l == -1:
				l = i
			r = i
	
	
	if l == -1:
		print("yes")
		print("1 1")
		return
	
	ar[l:r + 1] = reversed(ar[l:r + 1])

	if all(ar[i] < ar[i + 1] for i in range(n - 1)):
		print('yes')
		print(l + 1, r + 1)
		return

	print('no')

sort_the_array(arr, n)