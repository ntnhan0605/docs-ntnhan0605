def eulerPhi(n):
	i = 2
	result = n
	while i * i <= n:
		if n % i == 0:
			while n % i == 0:
				n /= i
			result = result * (i - 1) / i
		i += 1
	if n > 1:
		result = result * (n - 1) / n
	return int(result)

def main():
	while True:
		n = int(input())
		if n == 0:
			return
		print(eulerPhi(n))


main()
"""
12
123456
7654321
0
----
4
41088
7251444
"""