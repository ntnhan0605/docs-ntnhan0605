"""
input
5 2 3
6 2 3 100 1
output
3

input
7 3 4
1 1 9 1 1 1 1
output
0
"""
[n, a, b] = list(map(int, input().split()))
works = list(map(int, input().split()))
def chores_petya_vasya(ar, n, a, b):
	ar.sort(key=lambda s: -s)
	if a == 0 or a == n or b == 0 or b == n:
		return 0
	return ar[a - 1] - ar[a]

print(str(chores_petya_vasya(works, n, a, b)))
