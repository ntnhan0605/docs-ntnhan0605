n = int(input())

a = list(map(int, input().split()))

mx = 0
flag = True
for i in range(0, n):
	ai = a[i]
	if ai == 0:
		flag = False
		break
		
if flag:
	print('YES')
else:
	print('NO')