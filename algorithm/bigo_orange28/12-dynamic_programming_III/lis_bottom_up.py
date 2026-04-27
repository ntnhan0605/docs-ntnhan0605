def LIS(a):
	global last, db, path
	length = 0
	path = [-1] * len(a)
	dp = [1] * len(a)
	for i in range(1, len(a)):
		for j in range(i):
			if a[i] > a[j] and dp[i] < dp[j] + 1:
				dp[i] = dp[j] + 1
				path[i] = j
	for i in range(len(a)):
		if length < dp[i]:
			last = i
			length = dp[i]
	return length

"""
2 5 12 3 10 6 8 14 4 11 7 15


"""