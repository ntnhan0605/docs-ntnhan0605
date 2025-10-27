"""
Bạn được cho hai mảng A và B gồm các số nguyên được sắp xếp theo thứ tự không giảm. Kiểm tra xem có thể chọn k số từ mảng A và m số từ mảng B sao cho mọi số được chọn trong mảng đầu tiên nhỏ hơn mọi số được chọn trong mảng thứ hai.

Dữ liệu nhập
Dòng đầu tiên gồm hai số nguyên n A ( 1 ≤ nA, nB ≤ 10^5 ) cách nhau bởi khoảng trắng là kích thước của mảng A và B.
Dòng thứ hai gồm hai số nguyên k và m ( 1 ≤ k ≤ nA , 1 ≤ m ≤ nB ), cách nhau bởi khoảng trắng.
Dòng thứ ba gồm nA số a1, a2 , ... , anA  ( -10^9 ≤ a1 ≤ a2 ≤ ... ≤ anA ≤ 10^9 ), cách nhau bởi khoảng trắng — những phần tử trong mảng A.
Dòng thứ tư gồm nB số b1, b2 , ... , bnB  ( -10^9 ≤ b1 ≤ b2 ≤ ... ≤ bnB ≤ 10^9 ), cách nhau bởi khoảng trắng — những phần tử trong mảng B.
Dữ liệu xuất
In "YES" (không có dấu nháy kép) nếu có thể chọn k số từ mảng A và m số từ mảng B B sao cho mọi số được chọn từ mảng A A nhỏ hơn mọi số được chọn từ mảng B. Ngược lại, in "NO" (không có dấu nháy kép).

Input
3 3
2 1
1 2 3
3 4 5
Output 
YES

Input
3 3
3 3
1 2 3
3 4 5
Output
NO

Input
5 2
3 1
1 1 1 1 1
2 2
Output
YES

"""
[nA, nB] = map(int, input().split())
[k, m] = map(int, input().split())

arrA = list(map(int, input().split()))
arrB = list(map(int, input().split()))

def arrays(arrA, arrB, nA, nB, k, m):
	arrK = arrA[:k]
	arrM = arrB[nB - m:]
	if arrK[len(arrK) - 1] < arrM[0]:
		return 'YES'
	else:
		return 'NO'

print(arrays(arrA, arrB, nA, nB, k, m))