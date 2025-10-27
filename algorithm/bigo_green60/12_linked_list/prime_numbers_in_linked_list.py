def isPrime(x):
	if x <= 1:
		return False
	for i in range(2, int(x ** 0.5) + 1):
		if x % i == 0:
			return False
	return True

class Node:
	def __init__(self,x):
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
		
	def countPrime(self):
		cur = self.head
		count = 0
		while cur != None:
			if isPrime(cur.data):
				count+=1
			cur = cur.next
		return count

linkedList = LinkedList()
while True:
	x = int(input())
	if x == -1:
		break
	linkedList.insertTail(x)

print(linkedList.countPrime())

