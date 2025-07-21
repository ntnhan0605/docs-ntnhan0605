n = int(input())

a = list(map(int, input().split()))

male = 0
female = 0
for i in range(0, n):
	ai = a[i]
	if ai == 0:
		male += 1
	if ai == 1:
		female += 1

if male == female:
	print('YES')
else:
	print('NO')