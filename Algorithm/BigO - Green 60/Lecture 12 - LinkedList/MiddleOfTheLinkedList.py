"""
C1:
Duyệt qua linkedList -> đếm xem có tất cả bao nhiêu node?
nodes = 5
middle = nodes // 2

duyệt lịa linkedList -> vừa đi vừa đếm đang ở vị trí node thứ mấy?
nếu idx === middle:
	return cur
nodes = 0
cur = head
while cur != None:
	nodes += 1
	cur = cur.next

middle = nodes // 2
cur = head
idx = 0
while cur != None:
	 if idx = middle:
	 	return cur
	id += 1
	cur = cur.next

C2: 2 POINTERS
slow bước 1 bước , fast bước 2 bước
quãng đường slow = 1/2 fast
=> Nếu fast đi được hết linkedList -> slow sẽ ở vị trí middle
[1, 2,  3,  4,  5]
s,f
		s		f
				s				f

slow = fast = head
while fast != None and fast.next != None:
	slow = slow.next
	fast = fast.next.next
return slow
"""

