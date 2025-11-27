"""
input
5
1 1 1 1 2 2 3 2 2 1 1 1
output
2

input
0
0 0 0 0 0 0 0 1 1 2 3 0
output
0

input
11
1 1 4 1 1 5 1 1 4 1 1 1
output
3


12 tháng cây cao thêm a[i]: mỗi tháng: nếu tưới cây thì
k chiều cao
Yêu cầu: Tìm số tháng TỐI THIỂU cần tưới 
"""

"""
# BUSINESS TRIP
# Ý TƯỜNG
# 12 tháng cây cao thêm a[i] mỗi tháng: nếu tưới cây.
# k chiều cao. 
# yêu cầu: tìm số tháng TỐI THIỂU cần tưới để treeHeight >= k
# ý tưởng: để treeHeight >= k nhanh nhất thì:
# chọn các tháng có a[i] lớn nhất có thể.
# sắp xếp GIẢM DẦN.
# lưu số tháng cần tưới.
# a = [] => a.sort(): giảm dần
# months = 0
# for i from 0 to n - 1: 
# if k <= 0: break
# month += 1
# k -= a[i]
# mỗi lần duyệt qua a[i]:
# cộng dồn tháng đó lên: month += 1
# cập nhật lại k còn lại cần phải phát triển: k -= a[i]
# điều kiện dừng: 1. k <= 0: stop
#.                2. chạy hết mảng
# print(months if k <= 0 else -1)
"""

k = int(input())
arr = list(map(int, input().split()))

arr.sort(reverse=True)

months = 0
for h in arr:
	if k <= 0:
		break
	k -= h
	months += 1

print(months if k <= 0 else -1)