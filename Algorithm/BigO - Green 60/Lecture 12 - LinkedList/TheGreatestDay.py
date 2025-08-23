class Date:
	def __init__(self, day, month, year):
		self.day = day
		self.month = month
		self.year = year

	def __str__(self):
		return f"{self.day} {self.month} {self.year}"

	def greaterThan(self, date):
		if self.year > date.year or self.year == date.year and self.month > date.month or self.year == date.year and self.month == date.month and self.day > date.day:
			return True
		
		return False

class Node:
	def __init__(self, day, month, year):
		self.data = Date(day,month,year)
		self.next = None

class LinkedList:
	def __init__(self):
		self.head = self.tail = None

	def insertTail(self, day, month, year):
		p = Node(day, month, year)
		if self.head == None:
			self.head = self.tail = p
		else:
			self.tail.next = p
			self.tail = p
	
	def TheGreatestDay(self):
		max = cur = self.head
		while cur != None:
			if cur.data.greaterThan(max.data):
				max = cur
			cur = cur.next
		return max.data
	
n = int(input())
linkedList = LinkedList()
for i in range(n):
	day, month, year = map(int, input().split())
	linkedList.insertTail(day, month, year)

print(linkedList.TheGreatestDay())
			
