"""
3 2
0 1 1
1 0 1
1 1 0

=> 2
"""
n, x = map(int, input().split())
mtx = []
for i in range(n):
	mtx.append(list(map(int,input().split())))

count = [0] * n
for i in range(n):
	for j in range(n):
		if mtx[i][j] == 1 and i <= j:
			count[j] += 1
			count[i] += 1

print(count[x])