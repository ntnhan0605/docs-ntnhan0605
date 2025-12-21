"""
input
4 999998
1 1 1
2 2 1
3 3 1
2 -2 1
output
2.8284271
input
4 999998
1 1 2
2 2 1
3 3 1
2 -2 1
output
1.4142136
input
2 1
1 1 999997
2 2 1
output
-1
"""
import math

(n, s) = list(map(int, input().split()))
counter = dict()
for i in range(n):
	(x, y, k) = list(map(int, input().split()))
	dist = x * x + y* y
	if not dist in counter:
		counter[dist] = k
	else:
		counter[dist] += k

for (key, value) in counter.items():
	s += counter[key]
	if (s >= 1e6):
		print(math.sqrt(key))
		exit()
print(-1)
	