
def main():
	while True:
		k = int(input())
		if k == 0:
			break;
		w1 = input()
		w2 = input()
		n = len(w1)
		m = len(w2)

		c = [n+1][m+1]
		f = [n+1][m+1]

		for i in range(1, n):
			for j in range(1, m):
				if w1[i-1] == w2[j-1]:
					c[i][j] = c[i-1][j-1] + 1
				else:
					c[i][j] = 0
				f[i][j] = max(f[i][j-1], f[i-1][j])
				for e in range(k,c[i][j]):
					f[i][j] = max(f[i][j], f[i-e][j-e] + e)
		print(f[n][m])

main()
"""
3
lovxxelyxxxxx
xxxxxxxlovely
1
lovxxelyxxxxx
xxxxxxxlovely
3
lovxxxelxyxxxx
xxxlovelyxxxxxxx
4
lovxxxelyxxx
xxxxxxlovely
0
----
6
7
10
0
"""