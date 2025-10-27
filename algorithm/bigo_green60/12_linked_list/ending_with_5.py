def endingWith5(x):
	return True if abs(x) % 10 == 5 else False

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
			print(cur.data,end = ' ')
			cur = cur.next
		print()
	
	def insertTail(self, x):
		p = Node(x)
		if self.head == None:
			self.head = p
			self.tail = p
		else:
			self.tail.next = p
			self.tail = p

	def deleteEndingWith5(self):
		if self.head == None: return
		while self.head != None and endingWith5(self.head.data):
			self.head = self.head.next
		if self.head == None: return
		cur = self.head
		while cur.next != None:
			if endingWith5(cur.next.data):
				cur.next = cur.next.next
			else:
				cur = cur.next

n = int(input())
linkedList= LinkedList()		

for i in range(n):
	x = int(input())
	linkedList.insertTail(x)
	
linkedList.deleteEndingWith5()
linkedList.printList()