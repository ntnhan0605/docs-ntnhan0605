"""

"""

class Node:
	def __init__(self):
		self.child = [Node] * 26
		self.maxValue = -1

def addWord(root, s, value):
	tmp = root
	for c in s:
		pos = ord(c) - ord('a')
		if tmp.child[pos] == Node:
			tmp.child[pos] = Node()
		tmp = tmp.child[pos]
		tmp.maxValue = max(tmp.maxValue, value)

def getMaxValue(root,s):
	tmp = root
	for c in s:
		pos = ord(c) - ord('a')
		if tmp.child[pos] == None:
			return -1
		tmp = tmp.child[pos]
	return tmp.maxValue

(n, q) = list(map(int, input().split()))
root = Node()
for i in range(n):
	(s, value) = list(input().split())
	addWord(root, s, value)

for i in range(q):
	s = input()
	print(getMaxValue(root, s))
