"""
input
5
1 4
1 9
3
2 4
3
output
4
9
"""
"""
10
1 4
1 9
3
2 4
3
1 3
1 5
3
2 3
3
"""


"""


3 acts 
- 1 : thêm 1 phần tử 
- 2 : xóa 1 phần tử khỏi heap
- 3 : xuất phần tử có giá trị nhỏ nhất trong heap

i = 1: 1 4 -> [4]
i = 2: 1 9 -> [4, 9]
i = 3: 3   -> 4 [9]

"""
import heapq

n = int(input())
h = []
for i in range(n):
	act = list(map(int, input().split()))
	if act[0] == 1:
		heapq.heappush(h, act[1])
	if act[0] == 2:
		n = len(h)
		for j in range(n + 1):
			tmp = heapq.heappop(h)
			if tmp != act[1]:
				heapq.heappush(h, tmp)
	if act[0] == 3:
		print(h[0])
		