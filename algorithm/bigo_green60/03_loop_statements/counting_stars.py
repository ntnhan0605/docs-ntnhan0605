c = 0
n = 100000
while(n > 0):
	x = int(input())
	n -= 1
	if (x == 5):
		c += 1
	if (x == 0):
		break

print(c)