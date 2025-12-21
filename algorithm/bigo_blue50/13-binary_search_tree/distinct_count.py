"""
input
4
4 1
1 4 2 5
4 2
4 2 1 5
4 3
5 2 4 1
4 4
1 2 4 5
output
Average
Average
Average
Good

"""
class Node:
	def __init__(self, key):
		self.key = key
		self.left = None
		self.right = None

def insertNode(root, x):
	if root == None:
		return Node(x)
	if root.key > x:
		root.left = insertNode(root.left, x)
	else:
		root.right = insertNode(root.right, x)
	return root

tc = int(input())
for _ in range(tc):
	(N, X) = list(map(int, input().split()))
	arr = list(map(int, input().split()))
	bst = set()
	for i in range(N):
		bst.add(arr[i])
	size = len(bst)
	if size == X:
		print('Good')
	elif size > X:
		print('Average')
	else:
		print('Bad')