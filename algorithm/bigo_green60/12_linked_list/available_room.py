class Room:
	def __init__(self, id, price, status):
		self.id = id
		self.price = price
		self.status = status

	def __str__(self):
		return f"{self.id} {self.price}"

class Node:
	def __init__(self, id, price, status):
		self.data = Room(id, price, status)
		self.next = None
	
	def __str__(self):
		return self.data

class LinkedList:
	def __init__(self):
		self.head = self.tail = None
	
	def insertTail(self, id, price, status):
		p = Node(id, price, status)
		if self.head == None:
			self.head = self.tail = p
		else:
			self.tail.next = p
			self.tail = p

	def AvailableRoom(self):
		cur = self.head
		while cur != None:
			if cur.data.status == 0:
				print(cur.data)
			cur = cur.next
			
n = int(input())
linkedList = LinkedList()
for i in range(n):
	id, price, status = input().split()
	linkedList.insertTail(id, int(price), int(status))

linkedList.AvailableRoom()