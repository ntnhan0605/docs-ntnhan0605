mi = 10
ma = 0
n = 100000
while(n > 0):
	point = int(input())
	n -= 1
	if (point == -1):
		break
	if (point < 0 or point > 10):
		continue
	if (point < mi):
		mi = point
	if (point > ma):
		ma = point

print(ma, mi)
