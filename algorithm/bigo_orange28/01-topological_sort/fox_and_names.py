"""
3
rivest
shamir
adleman

bcdefghijklmnopqrsatuvwxyz
"""
"""
10
tourist
petr
wjmzbmr
yeputons
vepifanov
scottwu
oooooooooooooooo
subscriber
rowdark
tankengineer

Impossible
"""

"""
7
car
care
careful
carefully
becarefuldontforgetsomething
otherwiseyouwillbehacked
goodluck

acbdefhijklmnogpqrstuvwxyz
"""

import queue

n = int(input())
names = [] * n
relation = [[] for i in range(26)]
indegree = [0] * 26

for i in range(n):
	names.append(input())


for i in range(n - 2):
	s = names[i]
	t = names[i + 1]
	found = False
	for j in range(min(len(s), len(t)) - 1):
		if s[j] != t[j]:
			u = ord(s[j]) - ord('a')
			v = ord(t[j]) - ord('a') # 'b' - 'a' = 1
			indegree[v] += 1
			found = True
			break
	if not found and len(s) > len(t):
		print('Impossible')
		exit()
print(relation)
q = queue.PriorityQueue()
order = []
for i in range(26):
	if indegree[i] == 0:
		q.put(i)
	
while not q.empty():
	u = q.get()
	order.append(u)
	for v in relation[u]:
		indegree[v] -= 1
		if indegree[v] == 0:
			q.put(v)

if len(order) < 26:
	print('Impossible')
else:
	for u in order:
		print(chr(u + ord('a')), end = '')
	print()

