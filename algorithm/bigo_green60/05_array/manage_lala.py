n = int(input())

a = list(map(int, input().split()))

def docile1(a):
	if a[-1] == 0:
		return False
	for i in range(1, len(a) - 3):
		# if a[i] + a[i + 1] + a[i + 2] + a[i + 3] == 0:
		if sum(a[i:i+4]) == 0: # Slicing
			return False
	return True

# if docile1(a, n):
# 	print('YES')
# else:
# 	print('NO')

print("YES" if docile1(a) else "NO")

# Input: 
# n: int (số giờ)
# a_1, a_2, ..., a_n: (int, int, ..., int) a_i = 0 -> học tin học
# 																				 a_i = 1 -> học tiếng anh
                                         
# Output: 
# "YES" nếu lala nghe lời bố mẹ 
# "NO" ngược lại 

# Kiểm tra lala có nghe lời bố mẹ hay không -> kiểm tra 2 điều kiện: 
# 	1. Lala không học tin học quá 3 tiếng liên tục 
#   2. Mỗi lần học xong tin học sẽ dành ra ít nhất 1 tiếng học tiếng anh 
# 			-> Lala sẽ không thể học tin học ở khung giờ cuối cùng 
#       -> kiểm tra a_n = 0 -> "NO"

# 	Điều kiện số 2 thỏa thì mình xét tiếp điều kiện số 1 
#   Thực hiện vòng lặp kiểm tra 4 ngày liên tiếp: 
#   	a_i = 0 & a_{i + 1} = 0 & a_{i + 2} = 0 & a_{i + 3} = 0 -> chỉ chạy i = 0...n-4 
#     	-> "NO"
#   Nếu không có kết quả "NO"
# 	-> "YES" 