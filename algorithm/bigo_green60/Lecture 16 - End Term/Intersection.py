"""
1
5
5
6
8
8
11
23
100
-1
5
6
8
8
8
-1
=> 9 17



1
5
5
6
8
8
11
23
100
-1
5
6
8
8
8
-1
=> 5 6 8
"""


def intersection(list1, list2):
	set1 = set()
	current1 = list1.head
	while current1:
			set1.add(current1.data)
			current1 = current1.next

	intersection_list = LinkedList()
	added = set()
	current2 = list2.head
	while current2:
		if current2.data in set1 and current2.data not in added:
			intersection_list.insertTail(current2.data)
			added.add(current2.data)
		current2 = current2.next

	return intersection_list

class Node:
	def __init__(self, x):
		self.data = x
		self.next = None

class LinkedList:
	def __init__(self):
		self.head = self.tail = None

	def __str__(self):
		if not self.head and not self.tail:
			return "NO INTERSECTION"
		else:
			cur = self.head
			ans = ""
			while cur:
				ans += str(cur.data) + " "
				cur = cur.next
			return ans

	def insertTail(self, x):
		p = Node(x)
		if not self.head:
			self.head = self.tail = p
		else:
			self.tail.next = p
			self.tail = p

def getLinkedList(ll):
	while True:
		x = int(input())
		if x == -1:
			break
		ll.insertTail(x)

linkedList1 = LinkedList()
linkedList2 = LinkedList()
getLinkedList(linkedList1)
getLinkedList(linkedList2)

inter = intersection(linkedList1, linkedList2)
print("NO INTERSECTION" if not inter else inter)