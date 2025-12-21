"""
input
7
aab
defgab
abcde
aabcde
cedaaa
bbbbbbbbbb
jabjjjad
output
BAD SET
aabcde

input
4
aab
aac
aacghgh
aabghgh
output
BAD SET
aacghgh
"""

class Node:
	def __init__(self):
		self.count =  0
		self.child = [None] * 10

ans = ''
goodSet = True

def insertNode(root, s):
	tmp = root
	
	for ch in s:
		c = ord(ch) - ord('a')
		if  tmp.child[c] == None:
			tmp.child[c] = Node()
		tmp = tmp.child[c]
		if tmp.count > 0:
			ans = s
			goodSet = False
			return 
	tmp.count += 1
	for i in range(10):
		if tmp.child[i] != None:
			ans = s
			goodSet = False
			return

n = int(input())
root = Node()
for i in range(n):
	s = input()
	insertNode(root, s)
	if not goodSet:
		print('BAD SET')
		print(ans)
		exit()
print('GOOD SET')
