n = int(input())

a = list(map(int, input().split()))

mx = 0

for i in range(0, n):
	ai = a[i]
	if ai > mx:
		mx = ai

print(mx)