"""
input
0 0
0 1
0 2
1 0
1 2
2 0
2 1
2 2
output
respectable

input
0 0
1 0
2 0
3 0
4 0
5 0
6 0
7 0
output
ugly

input
1 1
1 2
1 3
2 1
2 2
2 3
3 1
3 2
output
ugly
"""

"""
Eight Point Sets
 Ý TƯỞNG
 8 dòng: mỗi dòng chứa:
 xi yi
 trong các điểm (xi, yi) đề bài cho, cần tìm:
 có: 3 xi và 3 yi phân biệt.
 với xi: vẽ 3 đường song song với trục hoành
 với yi: vẽ 3 đường thẳng song song với trục tung
 có 8 giao điểm từ 3 đường này.
 cần tìm: 8 giao điểm này có tồn tại trong số (xi, yi) đề bài cho hay không
 điều kiện tìm được 8 điểm thỏa:
 1. phải có 3 số phân biệt xi và yi
 
 mỗi cặp (xi, yi): là 1 điểm => tổng 8 điểm
 kiểm tra 8 điểm này có là giao điểm của 3 đường thằng:
 song song với trục hoành: (0, y1): (0, y2) (0, y3)
 song song với trục tung: (, y1) (0, y2)  (0, y3)
 
 xk = a[i] phân biệt
 yk = a[j] phân biệt
 x = 0 1 2
 y = 0 1 2
 (0, 0) (0, 1) (0, 2) 
 (1, 0) (1, 1) (1, 2)
 (2, 0) (2, 1) (2, 2)
 loại (1, 1) = index i == 1 && index j === 1
 để kiểm tra 8 điểm từ input thỏa mãn hay không:
 cần tìm 8 điểm mẫu:
 (xi, yi):
 Mà để có 8 điểm từ (xi, yj): phải có 3 điểm phân biệt:
 xi - yj
 BƯỚC 1: tạo mảng lưu số xi, yj phân biệt: 
 points = []: (x, y)
 tạo thêm mảng lưu số lần xuất hiện:
 unique_x = [] - unique_y = []: đếm số lượng x,y phân biệt
 và lưu x,y để tìm 8 điểm giao nhau.
 tạo 1 mảng lưu trạng thái duyệt: 
x_visited = [False] * (10^6)
y_visited = [FALSE] * (10^6)
 Read: x, y = input() => points.append(x,y)
 x_visited[x] = true - y_visited[y] = true:
 if đếm số x,y phân biệt nếu: 
X: x_visited[a[i]] == FALSE: unique_x.append(x)
Y: y_visited[a[j]] == FALASE: unique_y.append(y)
 => x_unique: lưu tổng số x phân biệt
 => y_unique: lưu tổng số y phân biệt
 BƯỚC 2: 
 TH1: nếu không có đủ 3 xi, yi phân biệt: => ugly
 x_unique y_unique: len(x_unique) != 3 or len(y_unique) != 3: exit
 TH2: có đủ 3 xi, yi thì tiếp tục.
 BƯỚC 3: cần tìm 8 điểm giao nhau từ 3 xi, yi phân biệt và kiểm tra 
 các điểm phân biệt từ input cho: có thỏa hay không.
 index = 0 (index của các điểm đề bài cho)
 sắp xếp x_unique.sort, y_unique.sort, points.sort
 for i in range(3):
.  for j in range(3):
 tạo 8 điểm giao nhau:
 			if i == 1 and j == 1: continue
  (x_unique[i], y_unique[j])
 tồn tại => check luôn: 
 DK: x_unique[i] === points[index][0] and y_unique[j] === points[index][1]: index += 1
 else: ugly return
 print(respectable)
"""

class Point:
	def __init__(self, x, y):
		self.x = x
		self.y = y
	def compare(self, P):
		if self.x == P.x and self.y == P.y:
			return True
		return False

points = []
X = []
Y = []

def includes(arr, element):
	for e in arr:
		if e == element:
			return True
	return False

for i in range(1, 9):
	[x, y] = list(map(int, input().split()))
	points.append(Point(x, y))
	if not includes(X, x):
		X.append(x)
	if not includes(Y, y):
		Y.append(y)

X.sort()
Y.sort()
points.sort(key=lambda p: (p.x, p.y))

def eight_point_set(points, X, Y):
	index = 0
	for i in range(3):
		for j in range(3):
			if i == 1 and j == 1: continue
			if not Point(X[i], Y[j]).compare(points[index]):
				return False
			index += 1
	return True

# Bước 2 nêú không đủ 3 xi, yi phân biệt thì => ugly
if len(X) != 3 or len(Y) != 3:
	print("ugly")
else:
	print('respectable' if eight_point_set(points, X, Y) else "ugly")


	
	