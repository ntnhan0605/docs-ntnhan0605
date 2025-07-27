n, m = map(int, input().split())

a = []
for i in range(n):
	ai = list(map(int, input().split()))
	a.append(ai)

def S(b):
	s = 0
	for i in range(0, len(b)):
		s += b[i]
	return s

for i in range(n):
	print(f"{i}: {S(a[i])}")
