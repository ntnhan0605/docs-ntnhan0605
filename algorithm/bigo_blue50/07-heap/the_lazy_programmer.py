"""
input
1
2
20 50 100
10 100 50
output
5.00
"""

"""
input
	t số lượng testcase
	mỗi testcase cho n số lượng công việc
	n dòng tiếp theo, cho l ai, 
output
"""

import queue


class Node:
	def __init__(self, a, b, d):
		self.a = a
		self.b = b
		self.d = d
	def __lt__(self, other):
		return self.a < other.a or (self.a == other.a and self.b < other.b)

t = int(input())
for tc in range(t):
	n = int(input())
	jobs = []
	for i in range(n):
		jobs.append(list(map(int, input().split())))
	pq = queue.PriorityQueue()
	time = 0
	answer = 0
	for (a, b, d) in jobs:
		time += b
		pq.put([a , b])
		while time > d:
			[ta, tb] = pq.get()
			if tb > time - d:
				tb -= time - d
				answer += (time - d) / ta
				time = d
				pq.put([ta, tb])
				

