class Node:
	def __init__(self,x):
		self.data = x
		self.next = None

class LinkedList:
	def __init__(self):
		self.head = self.tail = None

	def printLinkedList(self):
		cur = self.head
		while cur != None:
			print(cur.data, end = " ")
			cur = cur.next
		print()
	
	def insertTail(self, x):
		p = Node(x)
		if self.head == None:
			self.head = self.tail = p
		else:
			self.tail.next = p
			self.tail = p
		
	def shift(self):
		if self.head != None:
			self.head = self.head.next
			

n = int(input())
linkedList = LinkedList()
for i in range(n):
	line = input().strip()
	if line == '0':
		linkedList.shift()
	else:
		_, x = map(int, line.split())
		linkedList.insertTail(x)

linkedList.printLinkedList()
