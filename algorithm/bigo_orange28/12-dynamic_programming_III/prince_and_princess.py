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

def main():
	T = int(input())
	for i in range(T):
		n, p, q = list(map(int, input().split()))
		map = HashMap
		for i in range(1, p):
			x = int(input())
			map[x] = i
		arr = []
		for i in range(q):
			x = int(input())
			

main()




"""
1
3 6 7
1 7 5 4 8 3 9
1 4 3 5 6 2 8 9
----
Case 1: 4
"""