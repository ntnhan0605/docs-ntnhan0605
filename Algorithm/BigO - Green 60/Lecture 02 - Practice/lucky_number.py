a,b = map(int, input().split())
x = int(input())

ax = x % a == 0
bx = x % b == 0
if (ax and bx):
	print('Both')
elif(ax):
	print('Upan')
elif(bx):
	print('Ipan')
else:
	print('No')