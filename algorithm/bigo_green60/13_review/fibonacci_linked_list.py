import sys;

sys.setrecursionlimit(100001)

class Node:
	def __init__(self, x):
		self.data = x
		self.next = None

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
	
	def append(self, n):
		prev = self.head
		cur = self.head.next
		i = 0
		while i < n - 2:
			p = Node((prev.data + cur.data) % 1_000_007)
			self.tail.next = p
			self.tail = p
			prev = cur
			cur = p
			i+= 1
			
	def display(self):
		cur = self.head
		while cur:
			print(cur.data, end = " ")
			cur = cur.next
		print()


x, y, n = map(int, input().split())
linkedList = LinkedList()
linkedList.insertTail(x)
linkedList.insertTail(y)
linkedList.append(n)
linkedList.display()