n = int(input())
a = []
b = []
for i in range(0, n):
	ai, bi = map(int, input().split())
	a.append(ai)
	b.append(bi)

def fruits(a, b):
	index = 0
	for i in range(1, len(a)):
		if a[i] > a[index]:
			index = i
		elif a[i] == a[index]:
			if b[i] > b[index]:
				index = i
	return index

print(fruits(a, b) + 1)

# input 
# Giỏ thứ i: ai quả táo và bi quả cam
# 	Chọn giỏ i và j (i != j)
# 	Nếu như ai > aj
# 		Chọn giỏ i
# 	Nếu như ai = aj
# 		Xét số lượng cam: (bi và bj)
# 		Nếu bi > bj:
# 			chọn giỏ i
# 		ngược lại bi < bj
# 			chọn giỏ j
# lưu lại táo vào cam ở 2 mảng a và b
# Lặp qua n giỏ:
# 	Nhập vào số lượng táo và cam
# 	thêm số lướng táo vào a => a[i] số lượng táo của giỏ i
# 	thêm số lượng cam vào mảng b => b[i] số lượng cảm của giỏ i
# Giả sử giỏ 1 là giỏ có nhiều cam và táo nhất ans = 1
# Kiểm tra từ giỏ thứ 2 -> n giỏ, có giỏ nào nhiều táo và cam hơn không. 
# 	Nếu giỏ i có nhiều táo hơn (a[i] > a[ans]):
# 		Cập nhật đáp án (ans = i)
# 	Nếu giỏ i có cùng số táo với giỏ lớn nhất hiện tại (a[i] == a[ans]):
		# Kiểm tra số cam (b[i] > b[j]):
			# Cập nhật đáp án (ans = i)