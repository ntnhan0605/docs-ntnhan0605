"""
input
3 5
1 2 3
1 2 2 3 3
output
0

input
3 5
1 2 3
1 1 1 1 1
output
2

input
3 1
2 3 4
1
output
3

input
20 25
30 32 34 39 42 43 45 46 47 48 52 55 56 57 58 59 60 65 67 69
2 3 4 5 8 9 14 16 18 20 24 27 29 30 34 35 36 37 40 41 42 43 44 45 46
output
12
"""

[n, m] = list(map(int, input().split()))
qs = list(map(int, input().split()))
pre = list(map(int, input().split()))

def george_and_round(qs, pre, n, m):
	i = j = 0
	while i < n and j < m:
		if pre[j] >= qs[i]:
			i += 1
		j += 1
	return n - i

print(str(george_and_round(qs, pre, n, m)))