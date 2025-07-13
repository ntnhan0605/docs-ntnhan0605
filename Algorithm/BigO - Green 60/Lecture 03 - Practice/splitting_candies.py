n = int(input())

isOk = True
for i in range(0, n):
	x = int(input())
	if (x % 2 != 0):
		isOk = False
		break

if (isOk):
	print('YES')
else:
	print('NO')
