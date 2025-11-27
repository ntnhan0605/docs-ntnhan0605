"""
input
5
1 2 3 3 2
output
4

input
11
5 4 5 5 6 7 8 8 8 7 6
output
5

"""

n = int(input())
numberRange = list(map(int, input().split()))

def approximating_a_constant_range(a, n):
	freq = [0] * 100_001
	j = 0
	best = 0
	count = 0
	for i in range(n):
		while j < n and (not (count == 2 and freq[a[j]] == 0)):
			if freq[a[j]] == 0:
				count += 1
			freq[a[j]] += 1
			best = max(best, j - i + 1)
			j += 1
		if freq[a[i]] == 1:
			count -= 1
		freq[a[i]] -= 1
	return str(best)
print(approximating_a_constant_range(numberRange, n))