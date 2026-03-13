def main():
	K = int(input())
	N = input()
	sumDigit = 0
	digits = []
	for i in range(len(N)):
		sumDigit = sumDigit + int(N[i])
		digits.append(int(N[i]))
	if sumDigit >= K:
		print(0)
		return
	digits.sort()
	result = 0
	for i in range(len(digits)):
		if sumDigit >= K:
			break
		sumDigit = sumDigit + (9 - digits[i])
		result  += 1
	print(result)

main()



"""
3
11
----
1

3
99
----
0
"""