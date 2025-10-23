class Node:
	def __init__(self, u, v, w):
		self.u = u
		self.v = v
		self.w = w

def minWeight(arr, n, minW):
	ans = 0
	index = 0
	for i in range(n):
		if arr[i].w == minW:
			ans += 1
			index = i
	return ans * arr[index].w

n = int(input())
arr = []
minW = 1001
for i in range(n):
	u, v, w = map(int, input().split())
	arr.append(Node(u, v, w))
	if minW > w:
		minW = w

print(minWeight(arr, n, minW))