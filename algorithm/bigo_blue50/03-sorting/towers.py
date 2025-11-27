"""
input
3
1 2 3
output
1 3

input
inputcopy
3
1 2 3
outputcopy
1 3
inputcopy
4
6 5 6 7
outputcopy
2 3

output
2 3


N thanh gỗ -> k tháp
Yêu cầu : Tìm số k tối thiểu có thể xây từ N thanh gỗ
- Tạo 1 tháp bằng các thanh gỗ chồng lên nhau.
- Chỉ chồng các thanh gỗ nếu 
 - Các thanh gỗ có độ dài BẰNG NHAU.
Output:
	- In ra k tháp và trong số k có chiều cao tháp lớn nhất ( tổng số thanh gỗ của tháp đó )

"""

"""
# Ý TƯỞNG:
# N thanh gỗ để tạo thành k tháp
# yêu cầu: tìm số lượng k tối thiểu có thể xây từ n thanh gỗ.
# tạo tháp: bằng cách chồng các thanh gỗ lên nhau.
# yêu cầu: chỉ chồng các thanh gỗ lên nhau nếu:
# các thanh gỗ có CÙNG CHIỀU DÀI.
# Output: in ra k tháp - trong số k tháp in chiều cao của tháp lớn nhất (tổng số thanh gỗ của tháp đó)
# ví dụ: n = 3. chiều dài thanh: 1 2 3
#output: 1(max height) 3(3 thanh gỗ)
# ví dụ 2: n = 4 - 6 5 6 7: 66 5 7
#output: maxheight: 2 total = 3
# ý tưởng:
#1. total tòa tháp: số lượng số nguyên phân biệt trong mảng.
#2. maxheight: số lượng số trùng nhau lớn nhất.
# để đếm được số lượng số nguyên phân biệt => sắp xếp mảng tăng dần hoặc giảm dần.
# a = []
# a.sort()
# total = 1
# maxheight = 1
# currentHeight = 1
# mảng đã sắp xếp: duyệt index: from 1 to n - 1:
# tìm phân biệt: lấy a[i] == a[i - 1]: currentHeight += 1
# maxHeight = currentHeight if currentHeight > maxHeight
# total += 1 - currentHeight = 1
"""
n = int(input())
arr = list(map(int, input().split()))
arr.sort()

total = 1
maxHeight = 1
currentHeight = 1
for i in range(1, n):
	if arr[i] == arr[i - 1]:
		currentHeight += 1
		maxHeight = max(maxHeight, currentHeight)
	else:
		total += 1
		currentHeight = 1

print(f'{maxHeight} {total}')
