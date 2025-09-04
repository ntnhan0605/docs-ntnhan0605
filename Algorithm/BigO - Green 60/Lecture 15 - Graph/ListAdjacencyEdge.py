"""
List adjacency edge
Cho đồ thị có hướng có trọng số, được biểu diễn bằng danh sách cạnh (edge list). Hãy liệt kê danh sách 
K
K cạnh có trọng số nhỏ nhất. Liệt kê theo thứ tự giảm dần của trọng số.

Dữ liệu nhập
Dòng đầu tiên là số cạnh 
M
M và số 
K
K 
(
0
<
K
≤
M
≤
1
0
3
)
(0<K≤M≤10
​3
​​ ).

M
M dòng tiếp theo, mỗi dòng là ba số 
u
,
v
,
w
u,v,w biểu diễn cho cạnh 
(
u
,
v
)
(u,v) có trong số là 
w
w.

Với 
0
≤
u
,
v
≤
1
0
3
,
−
1
0
3
≤
w
≤
1
0
3
0≤u,v≤10
​3
​​ ,−10
​3
​​ ≤w≤10
​3
​​ .

Đảm bảo trọng số của các cạnh là đôi một khác nhau.

Dữ liệu xuất
In ra 
K
K dòng, gồm 
K
K cạnh có trọng số nhỏ nhất. In theo thứ tự giảm dần của các trọng số của cạnh.

Ví dụ
inputcopy
5 2
1 2 10
2 3 -8
1 5 3
2 4 0
5 2 6
outputcopy
2 4
2 3

"""

class Edge:
	def __init__(self, u, v, w = 0):
		self.u = u
		self.v = v
		self.w = w
	
	def __str__(self):
		return f"{self.u} {self.v}"

def merge(L, n1, R, n2, arr, n):
	i = j = k = 0
	while i < n1 and j < n2:
		if L[i].w < R[j].w:
			arr[k] = L[i]
			i += 1
		else:
			arr[k] = R[j]
			j += 1
		k += 1
	while i < n1:
		arr[k] = L[i]
		i += 1
		k += 1
	while j < n2:
		arr[k] = R[j]
		j += 1
		k += 1

def mergeSort(arr, n):
	if n > 1:
		n1 = n // 2
		n2 = n - n1
		L = arr[:n1]
		R = arr[n1:]
		mergeSort(L, n1)
		mergeSort(R, n2)
		merge(L, n1, R, n2, arr, n)

n, k = map(int, input().split())
arr = []
for i in range(n):
	u, v, w = map(int, input().split())
	arr.append(Edge(u, v, w))

mergeSort(arr, n)

for i in range(k - 1, -1, -1):
	print(arr[i])
