import sys
sys.setrecursionlimit(1_000_001)

class Node:
	def __init__(self, x):
		self.data = x
		self.left = self.right = None
	
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

def SumOfLeafNodesOnTheTree(node):
	if not node:
		return 0
	
	if not node.left and not node.right:
		return node.data
	
	return SumOfLeafNodesOnTheTree(node.left) + SumOfLeafNodesOnTheTree(node.right)
	

n = int(input())
arr = list(map(int, input().split()))
root = Node(arr[0])
for i in range(1, n):
	root.addToNodeBST(arr[i])

print(SumOfLeafNodesOnTheTree(root))