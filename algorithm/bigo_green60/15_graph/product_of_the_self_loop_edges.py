"""
Product of the self-loop edges
Cho đồ thị có hướng được biểu diễn bằng danh sách cạnh (edge list). Trong đồ thị có các cạnh khuyên. Hãy đếm số lượng khuyên và tính tích trọng số các cạnh khuyên đó.

Dữ liệu nhập
Dòng đầu tiên là số lượng cạnh M (1 ≤ M ≤ 10^6)
M dòng tiếp theo, mỗi dòng gôm ba số u, v và w mô tả cạnh (u, v) có trọng số là w (0 ≤ u, v < 10^3, 0 ≤ w ≤ 10^3)

Dữ liệu xuất
In ra số lượng cạnh khuyên và tích trọng số của các cạnh khuyên. Hai số cách nhau bởi khoảng trắng.

Trường hợp không có cạnh khuyên nào thì chỉ cần in ra -1.

Do tích các cạnh khuyên có thể rất lớn, ta chỉ cần in số dư của kết quả khi chia cho 10^{6} + 7.

Ví dụ
inputcopy
5
1 1 3
3 4 6
2 2 1
2 1 3
5 4 1
outputcopy
2 3
"""

class Edge:
	def __init__(self, u, v, w):
		self.u = u
		self.v = v
		self.w = w

def ProductOfTheSelfLoopEdges(arr, n):
	w = 1
	c = 0
	for i in range(n):
		if arr[i].u == arr[i].v:
			c += 1
			w *= arr[i].w
	w = w % 1_000_007
	print(f"{c} {w}" if c != 0 else "-1")

n = int(input())
arr = []
for i in range(n):
	u, v, w = map(int, input().split())
	arr.append(Edge(u, v, w))

ProductOfTheSelfLoopEdges(arr, n)