"""
input
3 6
N
N
E 1
N
N
N
10 2
N
N
0 0
output
Case 1:
1
2
1
3
2
Case 2:
1
2

1000000 2
E 98
N
2 20
N
E 2
E 2
E 1
E 1
N
E 1
N
N
E 2
N
N
N
E 1
E 2
E 1
N
N
N
N
0 0
"""
import queue

tc = 0
while True:
	[p, c] = list(map(int, input().split()))
	if p == 0 and c == 0:
		break;
	tc += 1;
	q = queue.Queue()
	for i in range(1, min(p, c) + 1):
		q.put(i)
	print(f"Case {tc}:")
	for i in range(c):
		line = input().split()
		type = line[0]
		if type == 'N':
			tmp = q.get()
			print(tmp)
			q.put(tmp)
		else:
			x = int(line[1])
			n = q.qsize()
			q.put(x)
			for j in range(n):
				tmp = q.get()
				if tmp != x:
					q.put(tmp)
