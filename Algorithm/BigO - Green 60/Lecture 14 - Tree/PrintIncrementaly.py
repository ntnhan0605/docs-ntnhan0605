class Node:
	def __init__(self, x, Left = None, Right = None):
		self.data = x
		self.left = Left
		self.right = Right
	
	def addToNodeBST(self, x):
		if x < self.data:
			if not self.left:
				p = Node(x)
				self.left = p
			else:
				self.left.addToNodeBST(x)
		elif x > self.data:
			if not self.right:
				p = Node(x)
				self.right = p
			else:
				self.right.addToNodeBST(x)

class BST:
	def __init__(self):
		self.root = None
	
	def addToBST(self, x):
		if not self.root:
			self.root = Node(x)
			return
		self.root.addToNodeBST(x)

def PrintIncrementaly(root, ans = ""):
	if root.left:
		ans += PrintIncrementaly(root.left)

	ans += str(root.data) + " "

	if root.right:
		ans += PrintIncrementaly(root.right)

	return ans


n = int(input())
arr = list(map(int, input().split()))
bst = BST()
for i in range(n):
	bst.addToBST(arr[i])

print(PrintIncrementaly(bst.root))