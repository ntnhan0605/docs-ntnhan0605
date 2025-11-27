"""
input
3
1 2 3
4
1 2 3 4
0
output
9
19
"""

import heapq


while True:
	n = int(input())
	if n == 0:
		break;
	minHeap = list(map(int, input().split()))
	heapq.heapify(minHeap)
	total = 0
	while len(minHeap) > 0:
		total += heapq.heappop(minHeap) + heapq.heappop(minHeap)
	print(total)