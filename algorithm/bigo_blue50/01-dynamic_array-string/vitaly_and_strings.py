"""
Vitaly là một cậu học sinh chăm chỉ chưa từng nghỉ một buổi học nào trong năm năm học ở trường đại học. Cậu ta luôn làm bài đúng giờ và qua mọi kỳ thi.

Trong buổi học cuối cùng giảng viên cho Vitaly hai chuỗi s và t.
Hai chuỗi có cùng độ dài, gồm các ký tự latin in thường, chuỗi s có thứ tự từ điển nhỏ hơn chuỗi t
Vitaly muốn biết có một chuỗi nào có thứ tự từ điển lớn hơn chuỗi s và đồng thời có thứ tự từ điển nhỏ hơn chuỗi t hay không
Chuỗi này chỉ gồm các ký tự latin in thường và có độ dài bằng với chuỗi s và t.

*Dữ liệu nhập
Dòng đầu tiên chứa chuỗi s ( 1 ≤ s ≤ 100 ) gồm các ký tự tiếng Anh viết thường.

Dòng thứ hai chứa chuỗi t  (|t| = |s|) gồm các chữ cái tiếng Anh viết thường.

Chắc chắn rằng chuỗi s và t có cùng độ dài và chuỗi s có thứ tự từ điển nhỏ hơn chuỗi t.

*Dữ liệu xuất
Nếu không tồn tại chuỗi thỏa yêu cầu thì in một dòng "No such string" không có nháy kép.

Nếu tồn tại chuỗi thì in ra chuỗi đó. Nếu có nhiều chuỗi thỏa mãn thì có thể in bất kỳ chuỗi nào trong số đó.

Input
k
m
Output
l

Input
klmnopq
klmpopq
Output
klmnopr

Input
abcde
abcdf
Output
No such string
"""

s = input()
t = input()

def next_string(s):
	s = list(s)
	i = len(s) - 1
	while i >=0:
		if s[i] != 'z':
			s[i] = chr(ord(s[i]) + 1)
			return "".join(s)
		s[i] = 'a'
		i -= 1
	return None

def vitaly_and_strings(s, t):
	x = next_string(s)
	if x and x < t:
		return x
	else:
		return "No such string"
	
print(vitaly_and_strings(s, t))
