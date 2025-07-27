s = input()

c = 0
for i in s:
	if '0' <= i and i <= '9':
		c += 1

print(c)