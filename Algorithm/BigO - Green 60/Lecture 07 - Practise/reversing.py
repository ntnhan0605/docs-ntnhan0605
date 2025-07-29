"""
- Đặt cờ prevIndex, array chứa word
- Loop
	- Nếu i == ' ' thì array được append word từ prevIndex:i và prevIndex được gán thành [i + 1]
- Loop ngược lại array 
	- Cộng lại chuỗi mới ngược lại


C2
- Đặt 3 cờ hiệu newString, prevIndex = len(s), sep
- Loop
	- Nếu s[i] == ' ' thì newString sẽ cộng từ i -> prevIndex 
			và gán prevIndex = i để cho điều kiện gặp i tiếp theo
	- Nếu i == 0 thì newString sẽ cộng từ 0 -> prevIndex 
			để không bỏ sót từ đầu tiên nếu ở đâu tiên không có khoảng trắng
"""

s = input()

newS = ''
prevIndex = len(s)
sep = ''
for i in range(len(s) - 1, -1, -1):
	if s[i] == ' ':
		newS += sep + s[i + 1:prevIndex]
		prevIndex = i
		sep = ' '
	if i == 0:
		newS += sep + s[i:prevIndex]

print(newS)