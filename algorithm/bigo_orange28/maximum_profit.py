def main():
	T = int(input())
	for tc in range(1, T + 1):
		k , n = list(map(int, input().split()))
		a = []
		for i in range(n-1):
			ai = int(input())
			a.append(ai)
		dp = [k + 1][n]
		dp[0][0] = 0
		for i in range(k):
			for j in range(1, n-1):
				x = dp[i][j - 1]
				y = -INF
				for t in range(j - 1):
					y = max(y, dp[i-1][t] + a[i][j-1])
		print(dp[x][k])
		
main()

"""
3
2
6
10 22 5 75 65 80
3
4
20 580 420 900
1
5
100 90 80 50 25
----
87
1040
0
"""