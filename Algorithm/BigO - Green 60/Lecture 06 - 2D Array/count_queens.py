def kt_cot(a, r, c, n):
	for k in range(n):
		if a[k][c] > a[r][c]:
			return False
	return True

def kt_dong(a, r, c, n):
	for k in range(n):
		if a[r][k] > a[r][c]:
			return False
	return True

def kt_cheo_chinh(a, r, c, n):
	for k in range(max(-r, -c), min(n - 1 - r, n - 1 - c) + 1):
		if a[r + k][c + k] > a[r][c]:
			return False
	return True

def kt_cheo_phu(a, r, c, n):
	for k in range(max(-r, -n + 1 + c), min(n - 1 - r, c) + 1):
		if a[r + k][c - k] > a[r][c]:
			return False
	return True

def kt_queen(a, r, c, n):
	return True if kt_cot(a, r, c, n) and kt_dong(a, r, c, n) and kt_cheo_chinh(a, r, c, n) and kt_cheo_phu(a, r, c, n) else False

n = int(input())
a = []
for i in range(0, n):
	ai = list(map(int, input().split()))
	a.append(ai)

c = 0

for i in range(n):
	for j in range(n):
		if kt_queen(a, i, j, n):
			c += 1

print(c)
	
"""
Các bước:
B1: Kiểm tra giá trị lớn nhất trên cột 
B2: Kiểm tra giá trị lớn nhất trên hàng
B3: Kiểm tra giá trị lớn nhật trên đường chéo chính
B4: Kiểm tra giá trị lớn nhất trên đường chéo phụ
B5: Kiểm tra tổng hợp 4 điều kiện ==> Thỏa count++

VD: 
a[i][j]
- Kiểm tra trên dòng : giữ i và thay j
- Kiểm tra trên cột : giữ j và thay i
- Đường chéo chính:  i - j = const
	- Nếu k : cận trên => (row + k) >= 0 and (row + k) <= (n - 1) 	====> k >= - row and k <= n - 1 - row
	- Nếu k : cận dưới => (col + k)  >= 0 and col + k <= (n - 1) 		====> k >= - col and k <= n - 1 - col
	=> k >= max(-row, -col) and k <= min(n - 1 - row, n - 1 - col)
- Đường chéo phụ: i + j = const
	- i = row + k ==> (row + k) >= 0 and (row + k) <= (n - 1) 	====> k >= -row and k <= n - 1 - row
	- j = col - k ==> (col - k) >= 0 and (col - k) <= (n - 1)		====> k >= col	and k <= col - n + 1
	=> 
"""