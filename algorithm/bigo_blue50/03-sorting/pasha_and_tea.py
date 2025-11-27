"""
input
2 4
1 1 1 1
output
3

input
3 18
4 4 4 2 2 2
output
18

input
1 5
2 3
output
4.5
"""

n, w = list(map(int, input().split()))
cups = list(map(int, input().split()))

def pasha_and_tea(arr, n, w):
	cupsSorted = sorted(arr)
	minNu = cupsSorted[0]
	minNam = cupsSorted[n]
	m = min(minNam / 2, minNu)
	total = 3 * n * m
	print(min(w,total))
pasha_and_tea(cups, n, w)
