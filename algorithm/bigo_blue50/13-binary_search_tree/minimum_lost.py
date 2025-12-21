"""

"""
class Node:
	def __init__(self,value):
		self.value = value
		self.left = None
		self.right = None

def insert(root, value):
	if root == None:
		return Node(value)
	if value < root.value:
		root.left = insert(root.left, value)
	if value > root.value:
		root.right = insert(root.right, value)
	return root

def upper_bound(root, value):
	if root == None:
		return None
	if root.value <= value:
		return upper_bound(root.right, value)
	left_node = upper_bound(root.left, value)
	if left_node == None:
		return root
	else:
		return left_node

n = int(input())
p = list(map(int, input().split()))
root = None
for i in range(n):
	px = upper_bound(root, p[i])
	