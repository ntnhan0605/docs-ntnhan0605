def distance():
	pass

def bruteForces():
	pass

def stripClosest():
	pass

def minDistance(points, i, j):
	pass

def main():
	n = int(input())
	a = list(map(int, input().split()))
	points = []
	prefixSum = 0
	for i in range(n):
		prefixSum = prefixSum + a[i]
		points.add(i, prefixSum)
	print(minDistance(points, 0, n - 1))





"""
4
1 0 0 -1
-----
1

2
1 -1
----
2
"""