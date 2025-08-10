# n = int(input())

# a = [0] * n

# for i in range(n):
# 	a[i] = input()


# def theLeastExistingCharacter(s):
# 	s = str(s).upper()
# 	if len(s) == 1:
# 		return s
# 	ch = s[0]
# 	count = s.count(ch)
# 	for i in range(1, len(s)):
# 		si = s[i]
# 		countSi = s.count(si)
# 		if (countSi < count):
# 			ch = si
# 			count = countSi
# 		elif countSi == count:
# 			if ord(ch) > ord(si):
# 				ch = si
# 				count = countSi
# 	return ch

# for s in a:
# 	print(theLeastExistingCharacter(s))



"""
Cho 1 chuỗi -> tìm kí tự có số lần xuất hiện ít nhất

Ý tường:
	- Sử dụng mảng đếm phân phối: count[] = [0] * 26 (26 ký tự Aa->Zz)
	- Duyệt từng kí tự s[i]:
		count 0 1 2 3 4
					A B C D E
			func position(c):
				return ord(c - ord('A')) -> thứ tự
			count[position(s[i])]
			func getMinCharacter():
				ans = ''
				min = 1001
				for i in range(26):
					if count[i] != 0 and count[i] < min:
						min = count[i]
						ans = char(ord('A') + i)
				return ans
"""

def getMinCharacter(s):
	count = [0] * 26
	for i in range(len(s)):
		pos = ord(s[i] - ord('A'))
		count[pos] += 1
	ans = ''
	min = 1001
	for i in range(26):
		if count[i] != 0 and min > count[i]:
			min = count[i]
			ans=chr(ord('A') + i)
	print(ans)

n = int(input())

for i in range(n):
	s = input()
	s = s.upper()
	getMinCharacter(s)