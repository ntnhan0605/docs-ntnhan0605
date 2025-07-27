n = int(input())

a = []
for i in range(n):
	ai = input()
	a.append(ai)

def standardizeTheName(name):
	newName = ''
	isFirst = False
	for idx in range(len(name)):
		i = name[idx]
		if i == ' ':
			isFirst = True
		else:
			if isFirst:
				newName += " " + i.upper()
			else:
				newName += i.upper() if idx == 0 else i.lower()
			isFirst = False
	return newName

for i in range(n):
	print(standardizeTheName(a[i]))