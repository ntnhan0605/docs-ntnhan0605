class Block:
	def __init__(self, x, y, z):
		self.x = x
		self.y = y
		self.z = z 

def LIS():
	pass

def main():
	tc = 1
	while True:
		n = int(input())
		if n == 0:
			break
		blocks = []
		for i in range(n):
			x, y, z = list(map(int, input().split()))
			arr = [x, y, z]
			for j in range(1, 7):
				blocks.append(arr)
				call next permutation (arr)
			sort(blocks) #decreasing order by x, if x are equa, increasing by y
			dp = []
			dp[0] = blocks[0].x
			answer = dp[0]
			for i in range(1, len(blocks) - 1): # 6 * n - 1
				for j in range(i - 1):
					if blocks[i].y < blocks[j].y:
						dp[i] = max(dp[i], dp[j] + blocks[j].z)
			answer = max(answer, dp[i])

			print("Case {tc}: maximum height = {answer}")
			print()



main()

"""
1
10 20 30
2
6 8 10
5 5 5
7
1 1 1
2 2 2
3 3 3
4 4 4
5 5 5
6 6 6
7 7 7
5
31 41 59
26 53 58
97 93 23
84 62 64
33 83 27
0
----
Case 1: maximum height = 40
Case 2: maximum height = 21
Case 3: maximum height = 28
Case 4: maximum height = 342
"""