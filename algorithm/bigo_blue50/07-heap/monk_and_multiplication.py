"""
input
5
1 2 3 4 5
output
-1
-1
6
24
60
"""
# import queue
# n = int(input())
# A = list(map(int, input().split()))

# heap = queue.PriorityQueue()
# for i in range(n):
# 	heap.put(-A[i])
# 	if i < 2: print(-1)
# 	else:
# 		max1 = heap.get()
# 		max2 = heap.get()
# 		max3 = heap.get()
# 		print(max1 * max2 * max3 * -1)
# 		heap.put(max1)
# 		heap.put(max2)
# 		heap.put(max3)

# Không dùng heap
n = int(input())
A = list(map(int, input().split()))
max1 = max2 = max3 = -1
for i in range(n):
	if A[i] > max1:
		max3 = max2
		max2 = max1
		max1 = A[i]
	elif A[i] > max2:
		max3 = max2
		max2 = A[i]
	elif A[i] > max3:
		max3 = A[i]
	if i < 2: print(-1)
	else: print(max1 * max2 * max3)