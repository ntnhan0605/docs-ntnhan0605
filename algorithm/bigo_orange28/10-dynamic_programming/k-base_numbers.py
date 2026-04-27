def main():
	n = int(input())
	k = int(input())
	endWith0 = [] * 20
	endNot0 = [] * 20
	endNot0[0] = k - 1
	for i in range(2, n):
		endWith0[i] = endNot0[i - 1]
		endNot0[i] = (endWith0[i - 1] + endNot0[i - 1]) * (k - 1)
	print(endWith0(n - 1) + endNot0[n - 1])

main()


"""
2
10
----
90
"""