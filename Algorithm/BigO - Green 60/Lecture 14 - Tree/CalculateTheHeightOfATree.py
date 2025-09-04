import sys
sys.setrecursionlimit(1_000_001)
class Node:
	def __init__(self, x, Left = None, Right = None):
		self.data = x
		self.left = Left
		self.right = Right
	
	def addToNodeBST(self, x):
		if x > self.data:
			if not self.right:
				self.right = Node(x)
			else:
				self.right.addToNodeBST(x)
		elif x < self.data:
			if not self.left:
				self.left = Node(x)
			else:
				self.left.addToNodeBST(x)

def CalculateTheHeightOfAtree(node):
	if not node:
		return 0

	if not node.left and not node.right:
		return 1

	left = 0
	if node.left:
		left += 1 + CalculateTheHeightOfAtree(node.left)
	
	right = 0
	if node.right:
		right += 1 + CalculateTheHeightOfAtree(node.right)
	
	return max(left, right)

n = int(input())
arr = list(map(int, input().split()))

root = Node(arr[0])
for i in range(1, n):
	root.addToNodeBST(arr[i])

print(CalculateTheHeightOfAtree(root))