
def reverseNumber(x):
	ans = 0
	while x != 0:
		ans = ans * 10 + x % 10
		x //= 10
	return ans


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

	def PalindromeNumber(self):
		cur = self.head
		i = 0
		while cur != None:
			if reverseNumber(cur.data) == cur.data:
				print(i, end = " ")
			cur = cur.next
			i+=1
		print()

linkedList = LinkedList()
while True:
	x = int(input())
	if x == -1:
		break
	linkedList.insertTail(x)

linkedList.PalindromeNumber()
