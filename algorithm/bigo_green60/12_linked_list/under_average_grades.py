class Node:
	def __init__(self,x):
		self.data = x
		self.next = None

	def __str__(self):
		return self.data

class LinkedList:
	def __init__(self):
		self.head = self.tail = None

	def insertTail(self, x):
		p = Node(x)
		if self.head == None:
			self.head = self.tail = p
		else:
			self.tail.next = p
			self.tail = p
	
	def underAverageGrades(self):
		cur = self.head
		while cur != None:
			if float(cur.data) < 5:
				print(cur.data)
			cur = cur.next
	
linkedList = LinkedList()
while True:
	x = input()
	if float(x) == -1:
		break
	linkedList.insertTail(x)

linkedList.underAverageGrades()