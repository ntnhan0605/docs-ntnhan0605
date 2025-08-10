n = int(input())

a = []
for i in range(n):
	ai = input()
	a.append(ai)

count = 1
for i in range(0, n - 1):
	if a[i] != a[i + 1]:
		count += 1 

print(count)