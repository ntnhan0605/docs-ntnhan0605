class Student:
	def __init__(self, id, name = '', score = 0):
		self.id = id
		self.name = name
		self.score = score
	def __str__(self):
		return f"{self.id} {self.name} {self.score}"

class Node:
	def __init__(self, id, name, score):
		self.data = Student(id, name, score)
		self.left = self.right = None
	
	def addToNodeBST(self, id, name, score):
		if score > self.data.score:
			if not self.right:
				self.right = Node(id, name, score)
			else:
				self.right.addToNodeBST(id, name, score)
		elif score < self.data.score:
			if not self.left:
				self.left = Node(id, name, score)
			else:
				self.left.addToNodeBST(id, name, score)

class BST:
	def __init__(self):
		self.root = None
	
	def addNode(self, id, name, score):
		if not self.root:
			self.root = Node(id, name, score)
			return
		self.root.addToNodeBST(id, name, score)

def FindTheStudenWithTheHighestScore(node):
	if not node.right:
		return node.data
	
	return FindTheStudenWithTheHighestScore(node.right)

n = int(input())
bst = BST()
for i in range(n):
	id, name, score = input().split()
	bst.addNode(id, name, float(score))

print(FindTheStudenWithTheHighestScore(bst.root))


		