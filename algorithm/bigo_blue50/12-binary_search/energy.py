"""
"""

"""
SumEnergy là tổng năng lượng ban đầu của các bình và 
m là năng lượng mỗi bình sau khi kết thúc quá trình trao đổi năng lượng.
Ta thấy:
- Tổng năng lượng sau khi kết thúc trao đổi :
	n * m
- Gọi xi là năng lượng của bình thứ i sẽ được chuyển đi:
xi = {0 (ai < m), ai - m (ai > m)}


** Nhận xét:
- Thùng thứ i chuyển đi sẽ mất xi * k / 100. Tổng năng lượng thất thoát là
	SumLost = (n-1)Tichphan(i=0)(xi * k / 100) = k / 100 * (n-1)Tichphan(i=0)(xi) = k * SumTransfer / 100
- Ta thấy rằng, tổng năng lượng trước quá trình trao đổi 


Với 1 giá trị w nào đó:
- Nếu w < (SumEnergy - SumLost) / n
	-> Vẫn còn năng lượng thừa chưa phân bố cho các bình
	-> Có thể tăng w lên
- Ngược lại, tức là số năng lượng có thể trao đổi không đủ để phân chia cho các bình
	-> Giảm w xuống

-> Có thể sử dụng binary search

"""

(n, k) = list(map(int, input().split()))
arr = list(map(int, input().split()))

def getSumTransfer(mid):
	res = 0
	for i in range(n):
		if arr[i] > mid:
			res += arr[i] - mid
	return res


sumEnergy = 0
left = 1000
right = 0
for i in range(n):
	arr[i]
	sumEnergy += arr[i]
	left = min(left,arr[i])
	right = max(right,arr[i])
__esp = 1e-7
mid = 0
while (right -left > __esp):
	mid = (left + right) // 2
	sumTransfer = getSumTransfer(mid)
	sumLost = sumTransfer * k / 100
	if mid * n < sumEnergy - sumLost:
		left = mid
	else:
		right = mid
print(mid)