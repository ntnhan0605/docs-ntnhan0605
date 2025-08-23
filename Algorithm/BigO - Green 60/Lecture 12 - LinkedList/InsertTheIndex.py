"""
3 -> 9 -> -5
1 -> 3 | 2 -> 9 | 3 -> -5

p.next = cur
if cur == head
	head = p
else:
	prev.next = cur

"""

class Node:
	def __init__(self, x):
		self.data = x
		self.next = None

class LinkedList:
	def __init__(self):
		self.head = None
		self.tail = None

	def printList(self):
		cur = self.head
		while cur != None:
			print(cur.data, end = " ")
			cur = cur.next
		print()

	def addTail(self, x):
		p = Node(x)
		if self.head == None:
			self.head = p
			self.tail = p
		else:
			self.tail.next = p
			self.tail = p

	def addIndex(self):
		cur = self.head
		prev = None
		index = 1
		while cur != None:
			p = Node(index)
			p.next = cur
			if cur == self.head:
				self.head = p
			else:
				prev.next = p
			prev = cur
			cur = cur.next
			index += 1


linkedList = LinkedList()
while True:
	x = int(input())
	if x == 0:
		break
	linkedList.addTail(x)
linkedList.addIndex()
linkedList.printList()

