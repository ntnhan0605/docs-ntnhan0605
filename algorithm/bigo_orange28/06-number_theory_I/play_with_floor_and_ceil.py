from math import floor


def extendEuclidean(a, b):
	if b == 0:
		return a, 1, 0
	gcd, x1, y1 = extendEuclidean(b, a % b)


def solveDiophantine(a, b, c):
	gcd, x, y = extendEuclidean(b, a % b)


def main():
	tc = int(input())
	for i in range(tc):
		x, k = list(map(int, input().split()))
		if x % k == 0:
			print(0, k)
		else:
			a = floor(x/ k)
			b = a + 1
			c = x
			p, q = solveDiophantine(a, b, c)
			print(p, q)


"""
3
5 2
40 2
24444 6
----
1 1 
1 1 
0 6
"""