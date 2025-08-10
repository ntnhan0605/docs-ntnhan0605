s = input()

newS = ""
for i in range(len(s)):
	if i == 0:
		newS += s[i].upper()
	if s[i] == ' ':
		newS += s[i + 1].upper()

print(newS)
