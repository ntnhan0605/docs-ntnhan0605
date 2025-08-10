n = int(input())

a = list(map(int, input().split()))

for i in range(0, n):
	ai = a[i]
	if ai % 2 == 0:
		print(ai)