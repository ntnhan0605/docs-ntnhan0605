n = int(input())
if (n != 1):
	c = 1
	for i in range(2, n // 2 + 1):
		if (n % i == 0):
			c+=1
	if (c >= 2):
		print('NO')
	else:
		print('YES')
else:
	print('NO')