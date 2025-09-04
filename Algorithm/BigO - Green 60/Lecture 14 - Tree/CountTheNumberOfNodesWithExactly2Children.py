"""
if not root:
	return 0

result = 0
if root.left and root.right:
	result = 1

result += count(root.left)
result += count(root.right)
return result
"""

import sys;

sys.setrecursionlimit(100001)

class Node:
	def __init__(self, x, left = None, right = None):
		self.data = x
		self.left = left
		self.right = right

	def addToNode(self, x):
		if x > self.data:
			if not self.right:
				p = Node(x)
				self.right = p
			else:
				self.right.addToNode(x)
		elif x < self.data:
			if not self.left:
				p = Node(x)
				self.left = p
			else:
				self.left.addToNode(x)


class BST:
	def __init__(self):
		self.root = None

	def addToBST(self, x):
		if not self.root:
			p =  Node(x)
			self.root = p
		else:
			self.root.addToNode(x)

def CountTheNumberOfNodesWithExactly2Children(root):
	if not root:
		return 0

	result = 0
	if root.left and root.right:
		result = 1
	
	result += CountTheNumberOfNodesWithExactly2Children(root.left)
	result += CountTheNumberOfNodesWithExactly2Children(root.right)

	return result

n = int(input())
arr = list(map(int, input().split()))
bst = BST()
for i in range(n):
	bst.addToBST(arr[i])

print(CountTheNumberOfNodesWithExactly2Children(bst.root))
