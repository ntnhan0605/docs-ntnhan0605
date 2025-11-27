"""
input
2 3
4 1
output
11

input
4 2
5 1 2 1
output
10

input
3 3
1 1 1
output
6
"""

[n, x] = list(map(int, input().split()))
chapters = list(map(int, input().split()))

def devu_the_dumb_guy(a, n, x):
	a.sort()
	total = 0
	for i in range(n):
		total += a[i] * max(x - i, 1)
	print(total)

devu_the_dumb_guy(chapters, n, x)
