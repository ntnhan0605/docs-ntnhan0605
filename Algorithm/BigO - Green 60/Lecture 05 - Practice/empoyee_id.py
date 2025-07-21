n = int(input())

a = list(map(int, input().split()))

for i in range(0, n):
	for j in range(i, n):
		if a[j] <= a[i]:
			tmp = a[j]
			a[j] = a[i]
			a[i] = tmp

r = 0
for i in range(0, n):
	if a[i] != i + 1:
		r = i + 1
		break
	else:
		r = len(a) + 1
		
print(r)
