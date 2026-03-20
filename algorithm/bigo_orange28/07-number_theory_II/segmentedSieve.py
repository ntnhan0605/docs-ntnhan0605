"""
Segmented Sieve: Dùng để tìm số các nguyên tố trong đoạn 
[left,right], với điều điện 
1 <= left <= right <= 10^12 và right - left <= 10^6
Ý tưởng:
Segmented sieve cũng áp dụng tư tưởng của sàng Eratosthenes.
Nhưng lúc này, sẽ ánh xạ đoạn [left,right] 
thành [0, right - left] để đánh dấu.
Độ phức tạp: O(Nlog(logN))
"""
def sieveOfEratosthenes(n):
	mark = [True] * (n + 1)
	primes = []
	mark[0] = mark[1] = False
	for i in range(2, int(n ** 0.5) + 1):
		if mark[i]:
			for j in range(i * i, n + 1, i):
				mark[j] = False
	for i in range(2, n + 1):
		if mark[i]:
			primes.append(i)
	return primes

# O(Nlog(logN))
def segmentedSieve(left, right, primes):
	if left == 1:
		left += 1
	mark = [True] * (right - left + 1)
	i = 0
	while i < len(primes) and primes[i] <= right ** 0.5:
		base = left // primes[i] * primes[i]
		if base < left:
			base += primes[i]
		for j in range(base, right + 1, primes[i]):
			if j != primes[i]:
				mark[j - left] = False
		i += 1
	result = []
	for i in range(left, right + 1):
		if mark[i - left]:
			mark[i-left] = True
			result.append(i)
	return result

def main():
	left = 11
	right  =  34
	primes = sieveOfEratosthenes(int(right ** 0.5))
	result = segmentedSieve(left, right, primes)

	for p in result:
		print(str(p),end = "  ")
	print()

main()