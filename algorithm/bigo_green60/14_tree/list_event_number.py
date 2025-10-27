import sys
sys.setrecursionlimit(1_000_001)

class Node:
	def __init__(self,x):
		self.data = x
		self.left = self.right = None
	
	def addToNodeBST(self, x):
		if x < self.data:
			if not self.left:
				self.left = Node(x)
			else:
				self.left.addToNodeBST(x)
		elif x > self.data:
			if not self.right:
				self.right = Node(x)
			else:
				self.right.addToNodeBST(x)

class BST:
	def __init__(self):
		self.root = None
	
	def addNode(self, x):
		if not self.root:
			self.root = Node(x)
			return
		self.root.addToNodeBST(x)

def ListEventNumber(root):
	ans = ''
	if root.left:
		ans += ListEventNumber(root.left)

	if root.right:
		ans += ListEventNumber(root.right)

	if root.data % 2 == 0:
		ans += str(root.data) + " "

	return ans

n = int(input())
arr = list(map(int, input().split()))
bst = BST()
for i in range(n):
	bst.addNode(arr[i])

print(ListEventNumber(bst.root))