x = int(input())

if (x % 2 == 0 and x > 2):
	a = 2
	b = x - a
	if (b % 2 == 0):
		print('YES')
else:
	print('NO')