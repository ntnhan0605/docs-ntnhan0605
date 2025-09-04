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

class BST:
	def __init__(self):
		self.root = None
	
	def addNode(self, x):
		if not self.root:
			self.root = Node(x)
			return
		self.root.addToNodeBST(x)

def SumValue(node, x):
	if not node:
		return 0
	
	ans = 0
	if node.data < x:
		ans += node.data
	
	ans += SumValue(node.left, x)
	ans += SumValue(node.right, x)
	return ans

n, x = map(int, input().split())
arr = list(map(int, input().split()))
bst = BST()
for i in range(n):
	bst.addNode(arr[i])

print(SumValue(bst.root, x))