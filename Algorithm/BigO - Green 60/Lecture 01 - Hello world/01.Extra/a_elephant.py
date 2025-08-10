x = int(input())

estStep = x // 5

if x % 5 == 0:
	print(estStep)
else:
	print(estStep + 1)