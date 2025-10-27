"""
Fashion in Berland
Theo quy tắc về thời trang của đất nước Berland, tất cả nút trên áo đều phải được cài trừ một nút duy nhất không cần phải cài. Tuy nhiên trong trường hợp đặc biệt với chiếc áo chỉ có đúng một nút thì nút đó phải được cài để áo không bị bay.

Bạn được cho một chiếc áo với N nút. Xác định xem áo đã được cài đúng hay chưa.

Dữ liệu nhập
Dòng đầu tiên chứa một số nguyên (1≤N≤1000) – số lượng nút trên áo.
Dòng tiếp theo lần lượt chứa N số là đại diện cho nút cài (số 1) hoặc nút không cài (số 0).

Dữ liệu xuất
In ra YES nếu áo được cài đúng quy tắc, ngược lại in ra NO.

Input: 
3
1 0 0
Output:
NO

Input:
3
1 0 1
Output:
YES
"""

n = int(input())
arr = list(map(int, input().split()))

def fashion_in_berland(ar, n):
	if n == 1:
		return True if ar[0] == 1 else False
	count = 0
	for i in range(n):
		ai = ar[i]
		if ai == 0:
			count += 1
	return True if count == 1 else False

if fashion_in_berland(arr, n):
	print('YES')
else:
	print('NO')