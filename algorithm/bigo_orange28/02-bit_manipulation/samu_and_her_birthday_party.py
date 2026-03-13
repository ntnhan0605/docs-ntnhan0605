"""
1
2 2
10
01

2
"""
def bitToInt(x, k):
	result = 0
	for i in range(k):
		if x[i] == '1':
			# result += (1<< i)
			result |= (1<< i)
	return result

def countBit (W):
	count = 0
	while W > 0:
		count += (W & 1)
		W >>= 1
	return count

T = int(input())
while not T:
	n, k = map(int, input().split())
	a = [] * n
	for i in range(n):
		x = input()
		a[i] = bitToInt(x, k)

ans = k
for W = 0 -> (1<<k) - 1:
	