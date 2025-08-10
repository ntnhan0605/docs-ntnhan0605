n = int(input())

a = list(map(int, input().split()))

mi = 1000
s = 0

for i in range(0, n):
	ai = a[i]
	if (ai < mi):
		mi = ai

for i in range(0, n):
	ai = a[i]
	s += ai - mi

print(s)