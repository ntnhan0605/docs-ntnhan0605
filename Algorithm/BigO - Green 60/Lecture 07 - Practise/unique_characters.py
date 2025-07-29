"""
Count characters in string
Note: UpperCase and LowerCase seperate

Count unique character

- tạo chuỗi mới rỗng
- loop qua từng ký tự
	- kiểm tra có ký tự đó trong chuỗi mới hay không
	- nếu không thì add vào chuỗi mới còn nếu có thì bỏ qua
- Đếm số ký tự trong chuỗi mới -> số ký tự unique

"""

s = input()

newS = ""
for i in s:
	if newS.find(i) == -1:
		newS += i

print(len(newS))