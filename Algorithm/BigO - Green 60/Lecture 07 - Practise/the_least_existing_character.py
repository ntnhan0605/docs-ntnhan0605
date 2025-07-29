n = int(input())

a = [0] * n

for i in range(n):
	a[i] = input()


def theLeastExistingCharacter(s):
	s = str(s).upper()
	if len(s) == 1:
		return s
	ch = s[0]
	count = s.count(ch)
	for i in range(1, len(s)):
		si = s[i]
		countSi = s.count(si)
		if (countSi < count):
			ch = si
			count = countSi
		elif countSi == count:
			if ord(ch) > ord(si):
				ch = si
				count = countSi
	return ch

for s in a:
	print(theLeastExistingCharacter(s))