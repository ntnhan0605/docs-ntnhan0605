n = 10000
ma = 0
isOk = True
while(n > 0):
	x = int(input())
	n -= 1
	if (x == 0):
		break
	if (ma < x):
		ma = x
	else:
		isOk = False

if (isOk):
	print('YES')
else:
	print('NO')