"""
input
5 3 0 0
1 2 3 3 4
1 3 5
output
2
1 1
3 2

input
3 3 2 2
1 5 9
3 5 7
output
3
1 1
2 2
3 3

"""

[n, m, x, y] = list(map(int, input().split()))
soldiers = list(map(int, input().split()))
vest = list(map(int, input().split()))

def dressem_in_vest(soldiers, vest, n, m, x, y):
	ans = []
	i = j = 0

	while i < n and j < m:
		ai = soldiers[i]
		bj = vest[j]
		if ai - x <= bj and bj <= ai + y:
			ans.append([i + 1, j + 1])
			i += 1
			j += 1
		elif ai - x > bj:
			j += 1
		elif ai + y < bj:
			i += 1
	print(len(ans))
	for [i, j] in ans:
		print(f'{i} {j}')

dressem_in_vest(soldiers, vest, n, m, x, y)