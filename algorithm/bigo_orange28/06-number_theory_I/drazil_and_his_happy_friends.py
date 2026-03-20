def main():
	n, m = list(map(int, input().split()))
	boys = [False]* n
	girls = [False] * m
	b = list(map(int, input().split()))
	for i in range(b[0]):
		boys[b[i + 1]] = True
	g = list(map(int, input().split()))
	for j in range(g[0]):
		girls[g[j + 1]] = True

	for i in range(2 * n * m):
		u = i % n
		v = i % m
		if boys[u] == True or girls[v] == True:
			boys[u] = girls[v] = True
	result = True
	for i in range(n):
		if boys[i] == False:
			result = False
	for i in range(m):
		if girls[i] == False:
			result = False
	if result:
		print('Yes')
	else:
		print('No')

main()


"""
2 3
0
1 0
----
Yes

2 4
1 0
1 2
----
No

2 3
1 0
1 1
----
Yes
"""