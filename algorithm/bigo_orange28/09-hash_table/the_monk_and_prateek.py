def sumDigit(n):
	sum = 0
	while n > 0:
		sum += n % 10
		n = n / 10
	return sum

def f(n):
	return n ^ sumDigit(n)

def main():
	nCollisions = 0
	maxHashValue = -1
	minHashValueCollision = INF
	maxFreq = 0
	freq = HashTable(Number -> Number)

	n = int(input())
	a = []
	for x in a:
		hasValue = f(x)
		maxHashValue = max(maxHashValue, hasValue)
		freq[hasValue] += 1
	for key in freq.keySet():
		nCollisions += freq[key] - 1
		maxFreq = max(maxFreq, freq[key])
	
	if nCollisions == 0:
		print(maxHashValue, nCollisions)
	else:
		for key in freq.keySet():
			if freq[key] == maxFreq:
				minHashValueCollision = min(key, minHashValueCollision)
		print(minHashValueCollision, nCollisions)


"""
2
40 50
----
55 0

4
10 11 12 13
----
9 1
"""