"""
Crossroads
Biết rằng tai nạn sẽ xảy ra nếu xe đụng phải người đi bộ. Do đó chúng ta cần tránh sao cho đèn báo hiệu dành cho người đi bộ của phần ngã tư bất kỳ không được bật lên cùng lúc với đèn xanh của làn xe có thể chạy qua phần ngã tư đó.

Mr. Bean có nhiệm vụ điều kiển giao thông. Bạn hãy giúp cậu ấy kiểm tra xem liệu tai nạn có thể xảy ra hay không.

Dữ liệu nhập
Gồm 4 dòng tương ứng với 4 phần ngã tư theo thứ tự ngược chiều kim đồng hồ.

Mỗi dòng gồm 4 số nguyên l, s, r, p với 0 là đèn đỏ, 1 là đèn xanh.

Dữ liệu xuất
Một dòng duy nhất, in ra “YES” nếu tai nạn có thể xảy ra, ngược lại in ra “NO”. Không in cặp dấu “ “.

Ví dụ
inputcopy
1 0 0 1
0 1 0 0
0 0 1 0
0 0 0 1
outputcopy
YES
inputcopy
0 1 1 0
1 0 1 0
1 1 0 0
0 0 0 1
outputcopy
NO
inputcopy
1 0 0 0
0 0 0 1
0 0 0 0
1 0 1 0
outputcopy
NO
Giải thích ví dụ
Ví dụ 1:

Tai nạn có thể xảy ra vì xe ở phần ngã tư thứ nhất có thể đụng phải người đi bộ ở phần ngã tư thứ nhất và thứ tư, đồng thời xe ở phần ngã tư thứ hai và ba có thể đụng phải người đi bộ ở phần ngã tư thứ tư.



Ví dụ 2:

Không có xe nào đi qua phần ngã tư số bốn nơi có đèn báo hiệu dành cho người đi bộ bật sáng. Thế nên tai nạn không thể xảy ra.
"""

arr = []
for i in range(4):
	arr.append(list(map(int, input().split())))

def crossroads(arr):
	for i in range(4):
		for j in range(4):
			if arr[i][j] != 
print(arr)

