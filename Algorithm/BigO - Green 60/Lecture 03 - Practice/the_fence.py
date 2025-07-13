n = int(input())

t = ''
for i in range(0, n):
	if (i == 0 or i == n - 1):
		t += "*"*n+"\n"
	else:
		t += '*' + ' '* (n - 2) + '*\n'
print(t)