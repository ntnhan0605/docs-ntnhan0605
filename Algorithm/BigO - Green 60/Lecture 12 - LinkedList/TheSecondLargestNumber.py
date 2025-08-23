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
		if self.head == None:
			self.head = self.tail = p
		else:
			self.tail.next = p
			self.tail = p
	
	def maxInList(self):
		max = tmp = self.head
		while tmp != None:
			if tmp.data > max.data:
				max = tmp
			tmp = tmp.next
		return max
	
	def theSecondLargestNumber(self):
		max = self.maxInList()
		tmp = secondMax = self.head
		while tmp != None:
			if tmp.data >= secondMax.data and tmp.data < max.data:
				secondMax = tmp
			tmp = tmp.next
		return '-1' if secondMax.data == max.data else secondMax

linkedList = LinkedList()

while True:
	x = float(input())
	if x == -1:
		break
	linkedList.insertTail(x)

print(linkedList.theSecondLargestNumber())