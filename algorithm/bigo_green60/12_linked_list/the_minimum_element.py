class Node:
	def __init__(self,x):
		self.data = x
		self.next = None
	
	def __str__(self):
		return f"{self.data}"

class LinkedList:
	def __init__(self):
		self.head = self.tail = None

	def insertTail(self, x):
		p = Node(x)
		if (self.head == None):
			self.head = self.tail = p
		else:
			self.tail.next = p
			self.tail = p
	

	def displayLinkedList(self):
		cur = self.head
		while cur != None:
			print(cur.data, end = ' ')
			cur = cur.next
		print()

	def minimumElement(self):
		min = cur = self.head
		while cur != None:
			if cur.data < min.data:
				min = cur
			cur = cur.next
		return min

linkedList = LinkedList()		
while True:
	x = int(input())
	if x == 0:
		break
	linkedList.insertTail(x)

print(linkedList.minimumElement())