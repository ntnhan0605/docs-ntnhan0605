"""
input
2
3 2
1 2
2 3
10 12
1 2
3 1
3 4
5 4
3 5
4 6
5 2
2 1
7 1
1 2
9 10
8 9
output
3
7
"""


tc = int(input())

parent = []
num = []
rank = []


def findSet(u):
	if parent[u] == u:
		return u
	parent[u] = findSet(parent[u])
	return parent[u]

def unionSet(a, b):
	up = findSet(a)
	vp = findSet(b)
	if up == vp:
		return
	if rank[up] > rank[vp]:
		parent[vp] = up
		num[up] = num[vp] + num[up]
	elif rank[up] < rank[vp]:
		parent[up] = vp
		num[vp] = num[vp] + num[up]
	else:
		parent[vp] = up
		rank[up] = rank[up] + 1
		num[up] = num[vp] + num[up]

for _ in range(tc):
	(N, M) = list(map(int, input().split()))
	parent = [i for i in range(N + 1)]
	rank = [0] * (N + 1)
	num = [1] * (N + 1)
	for i in range(M):
		(u, v) = list(map(int, input().split()))
		unionSet(u, v)

	ans = 0
	for i in range(1, N + 1):
		if parent[i] == i and ans < num[i]:
			ans = num[i]
	print(ans)
