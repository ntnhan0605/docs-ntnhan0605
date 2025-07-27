s = input()

newS = ""
sep = ''
for i in range(len(s)):
	si = s[i]
	if si != ' ':
		newS += sep + si
		if s[min(i + 1, len(s) - 1)] == ' ':
			sep = ' '
		else:
			sep = ''
		
print(newS)


"""
s = input()
arrS = s.split(' ')

newS = ''
sep = ''
for i in arrS:
	if i != "":
		newS += sep + i
		sep = ' '

print(newS)
"""