def LIS(a):
	global last, db, path
	length = 0
	path = [-1] * len(a)
	dp = [1] * len(a)
	for i in range(1, len(a)):
		for j in range(i):
			if a[i] >= a[j] and dp[i] < dp[j] + 1:
				dp[i] = dp[j] + 1
				path[i] = j
	for i in range(len(a)):
		if length < dp[i]:
			last = i
			length = dp[i]
	return length

def main():
	tc = 0
	while True:
		tc += 1
		arr = []
		while True:
			x = int(input())
			if x == -1:
				break
			arr.append(x)
		if len(arr) == 0:
			break
		else:
			if tc != 1:
				print()
		arr.reverse();
		print(f"Test #{tc}:")
		print(f"  maximum possible interceptions: {LIS(arr)}")
		
main()


"""
389
207
155
300
299
170
158
65
-1
23
34
21
-1
-1
----
Test #1:
  maximum possible interceptions: 6

Test #2:
  maximum possible interceptions: 2
"""