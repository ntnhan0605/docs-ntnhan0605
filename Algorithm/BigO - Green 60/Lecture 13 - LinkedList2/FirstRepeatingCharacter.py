CHAR = ''
class Node:
	def __init__(self, x):
		self.data = x
		self.next = None
	
class LinkedList:
	def __init__(self):
		self.head = self.tail = None
	
	def insertTail(self, x):
		p = Node(x)
		if not self.head:
			self.head = self.tail = p
		else:
			self.tail.next = p
			self.tail = p
	
	def FirstRepeatingCharacter(self):
		cur = self.head
		char = ''
		count = 0
		while cur:
			if count >= 2:
				break
			if cur.data != char:
				char = cur.data
				count = 1
			if cur.data == char:
				count += 1
			cur = cur.next
		print(char if char else "null")
		

