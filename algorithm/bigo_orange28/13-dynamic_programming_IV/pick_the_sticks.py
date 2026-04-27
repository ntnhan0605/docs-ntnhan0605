"""
func main():
	read(T)
	for tc in 1 -> T:
		read(n, L)
		for i 1 --> n:
			read(a[i], v[i])
			ans = max(ans, v[i])

		L *= 2
		dp = [n + 1][L + 1][3] = {0}
		for i in 1 --> n:
			for j in 1 --> L:
				for cnt 0 --> 2:
					dp[i][j][cnt] = dp[i - 1][j][cnt]
					if j >= 2 * a[i]:
						dp[i][j][cnt] = max(dp[i][j][cnt], dp[i - 1][j - 2*a[i]][cnt] + v[i])
					if j >= a[i] and cnt > 0:
						dp[i][j][cnt] = max(dp[i][j][cnt], dp[i-1][j-a[i]][cnt - 1] + v[i])

		for cnt in 0 --> 2:
			ans = max(ans, dp[n][L][cnt])
		
		print("Case #" + tc + ": " + ans)

"""

"""
4

3 7
4 1
2 1
8 1

3 7
4 2
2 1
8 4

3 5
4 1
2 2
8 9

1 1
10 3
----
Case #1: 2
Case #2: 6
Case #3: 11
Case #4: 3
"""