"""
Vanya cố gắng vào trang Codehorses. Anh ấy dùng n mật khẩu riêng biệt cho tất cả trang web, nhưng không nhớ đã dùng cái nào trong lúc đăng ký Codehorses.
Vanya nhập mật khẩu theo thứ tự độ dài không giảm, và nhập mật khẩu có cùng độ dài theo thứ tự tùy ý. Khi Vanya nhập đúng mật khẩu, anh ấy được phép vào trang web. Vanya sẽ không nhập bất kỳ mật khẩu nào hai lần.
Việc nhập mật khẩu bất kỳ sẽ tốn 1 giây. Nếu Vanya nhập sai mật khẩu k lần, thì 5 giây sau anh ta mới có thể thử lần tiếp theo. Tại mỗi thời điểm Vanya có thể nhập mật khẩu, anh ta sẽ thực hiện ngay.
Xác định Vanya cần bao nhiêu giây để vào Codehorses trong trường hợp tốt nhất (tốn ít giây nhất) và trường hợp xấu nhất (tốn nhiều giây nhất).

Dữ liệu nhập
Dòng đầu tiên chứa hai số nguyên n và k ( 1 ≤ n, k ≤ 100 ) - số lượng mật khẩu của Vanya và số lần thử thất bại, bị chặn truy cập trang trong 5 giây sau khi thử k lần thất bại.
n dòng tiếp theo chứa các mật khẩu, trên mỗi dòng là chuỗi riêng biệt khác rỗng gồm chữ cái và chữ số latin. Mỗi mật khẩu có chiều dài không quá 100.
Dòng cuối chứa mật khẩu Codehorses của Vanya. Đảm bảo mật khẩu Codehorses của Vanya là 1 trong n mật khẩu của anh ta.

Dữ liệu xuất
In 2 số nguyên - thời gian mà Vanya cần để vào được Codehorses trong trường hợp tốt nhất và trường hợp xấu nhất.

Input
5 2
cba
abc
bb1
abC
ABC
abc
Output
1 15

Input
4 100
11
22
1
2
22
Output
3 4


VD1:	5 2
good = 0, bad = 0
good case: [abc], cba, bb1, abC, ABC => good = 1
bad case: cba, bb1, abC, ABC, [abc] => bad = 0
- cba: bad += 1, c = 1
- bb1: bad += 1, c = 2 (k), => bad += 5
- abC: bad += 1, c = 1
- ABC: bad += 1, c = 2 (k), => bad += 5
- [abc]: bad += 1
=> bad = 15

VD2:	4 100
good = 0, bad = 0
good case: 1, 2, [22], 11
- 1 : good += 1, c = 1
- 2 : good += 1, c = 2
- 22	: good += 1, c = 3
=> good = 3
bad case: 1, 2, 11, [22]
- 1 : bad += 1, c = 1
- 2 : bad += 1, c = 2
- 11 : bad += 1, c = 3
- 22 : bad += 1, c = 4
=> bad = 4
"""
[n, k] = list(map(int, input().split()))
arr = []
for i in range(n):
	ai = input()
	arr.append(ai)
pw = input()


def passwords(arr, k, pw):
	length = len(pw)
	less = sum(1 for s in arr if len(s) < length)
	equal = sum(1 for s in arr if len(s) == length)
	t_min = less + 1
	t_max = less + equal 

	def total_time(t, k):
		waits = (t - 1) // k
		return t + waits * 5

	return [total_time(t_min,k), total_time(t_max, k)]

print(" ".join(map(str, passwords(arr, k, pw))))
	

