n = int(input())

s = 0
def exponential(i):
	return i * i

for i in range(1, n + 1):
	s += exponential(i)

print(s)