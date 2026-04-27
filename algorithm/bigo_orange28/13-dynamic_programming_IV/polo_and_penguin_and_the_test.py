class Quest:
	def __init__(self, point, time):
		self.point = point
		self.time = time

def main():
	T = int(input())
	while T:
		a = [] # array of quests
		n, w = list(map(int, input().split()))
		for i in range(n):
			c, p, t = list(map(int, input().split()))
			a.append(Quest(c * p, t))
			dp = [0 * (n + 1)] * (w + 1)
			# for i in range(n):
			# 	for j in range(w):
			# 		dp[i][j] = 0
			
			for i in range(n):
				for j in range(w):
					if j < a[j - 1].time:
						dp[i][j] = dp[i - 1][j]
					else:
						tmp1 = dp[i - 1][j]
						tmp2 = dp[i - 1][j - a[i - 1].time] + a[i - 1].point
						dp[i][j] = max(tmp1, tmp2)

		print(dp[n][w])
		T -= 1

main()

"""
1
3 7
1 2 3
2 3 5
3 3 3
----
11
"""