"""
- Tạo chuỗi mới và cờ index cần được upper case
- Loop
	- Điều kiện gắn index cần được upper case
		- khi i != 0 và s[i] == ' ' và s[i - 1] == '.'
		- Đặt lại cờ index = i
	- Đồng thời cờ index để upper case ký tự rồi gán vào chuỗi mới
- In chuỗi mới
"""
s = input()

newS = ''
indexUpper = 0
for i in range(len(s)):
	si = s[i]
	if indexUpper == i and indexUpper != 0:
		newS += si.upper()
	else:
		newS += si

	if i != 0 and  si == ' ' and s[i - 1] == '.':
		indexUpper = i + 1

print(newS)


# s = input()
# ans = ''
# for i in range(len(s)):
#     if i >= 2 and s[i - 2] == '.' and s[i - 1] == ' ' and s[i] >= 'a' and s[i] <= 'z':
#         ans += chr(ord(s[i]) - ord('a') + ord('A'))
#     else:
#         ans += s[i]
# print(ans)