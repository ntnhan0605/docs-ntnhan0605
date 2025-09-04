n = int(input())
arr = []
for i in range(n):
	arr.append(list(map(int, input().split())))

class Edge:
	def __init__(self, x, y):
		self.x = x
		self.y = y


for i in range(n):
	for j in range(n):
		if arr[i][j] == 1 and i <= j:
			ll.insertTail(i, j)
