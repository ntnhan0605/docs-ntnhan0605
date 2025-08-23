class Node:
	def __init__(self, x):
		self.data = x
		self.next = None

p1 = Node(10)

class LinkedList:
	def __init__(self):
		self.head = None
		self.tail = None
		
	def insertTail(self, x):
		# empty list -> 1
		# 0 -> 1
		if self.head == None:
			p = Node(x)
			self.head = p
			self.tail = p
		else:
			# 1 -> 2 -> 3 -> 4 ...
			p = Node(x)
			self.tail.next = p
			self.tail = p

	def min(self):
		ans = self.head
		p = self.head
		while p!= None:
			if p.data < ans.data:
				ans = p	
			p = p.next
		return ans

list1 = LinkedList()

while True:
	x = int(input())
	if x == 0:
		break
	list1.insertTail(x)

ans = list1.min()
