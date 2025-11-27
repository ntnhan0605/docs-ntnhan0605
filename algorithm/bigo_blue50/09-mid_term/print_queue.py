"""
inputcopy
3
1 0
5
4 2
1 2 3 4
6 0
1 1 9 1 1 1
outputcopy
1
2
5
"""
"""
- Range 1 - 9
"""
import queue

tc = int(input())

for _ in range(tc):
	[n, m] = list(map(int, input().split()))
	arr = list(map(int, input().split()))
	q = queue.Queue()
	for i in range(n):
		q.put(i)
		if arr[i] >= arr[m]:
			n = q.qsize()
			for _ in range(n-1):
				tmp = q.get()
				q.put(tmp)
	print(q.queue)
	count = 0
	index = -1
	while not q.empty():
		if index == m:
			break
		count += 1
		index = q.get()
	print(count)

	
