import sys
sys.setrecursionlimit(1_000_001)

class Node:
	def __init__(self, x, left = None, right = None):
		self.data = x
		self.left = left
		self.right = right
	
	def addToNode(self, x):
		if x < self.data:
			if not self.left:
				p = Node(x)
				self.left = p
			else:
				self.left.addToNode(x)
		elif x > self.data:
			if not self.right:
				p = Node(x)
				self.right = p
			else:
				self.right.addToNode(x)

class BST:
	def __init__(self):
		self.root = None
	
	def addToBST(self, x):
		if not self.root:
			self.root = Node(x)
			return
		self.root.addToNode(x)

def FindTheMinimumElement(root):
	if not root.left:
		return root.data
	return FindTheMinimumElement(root.left)


n = int(input())
arr = list(map(int, input().split()))
bst = BST()
for i in range(n):
	bst.addToBST(arr[i])

print(FindTheMinimumElement(bst.root))