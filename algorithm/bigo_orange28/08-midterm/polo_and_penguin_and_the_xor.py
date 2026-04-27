def sum_of_xor_sums(prefix_xor, N):
		total_sum = 0
		max_val = max(prefix_xor)
		MAX_BITS = max_val.bit_length()
		if MAX_BITS == 0:
				return 0
		for bit in range(MAX_BITS):
				count_0 = 0
				count_1 = 0
				for i in range(N + 1):
						if (prefix_xor[i] >> bit) & 1:
								count_1 += 1
						else:
								count_0 += 1
				total_sum += (count_0 * count_1) * (1 << bit)
		return total_sum

def xor_sum(N, A):
		prefix_xor = [0] * (N + 1)
		for i in range(1, N + 1):
				prefix_xor[i] = prefix_xor[i - 1] ^ A[i - 1]

		return sum_of_xor_sums(prefix_xor, N)

T = int(input())
for _ in range(T):
		N = int(input())
		A = list(map(int, input().split()))
		print(xor_sum(N, A))





"""
Polo the Penguin and the XOR
Polo, the Penguin, likes the XOR operation. Please read the NOTE below if you are not familiar with XOR operation.

XOR-sum of a list of numbers is the result of XOR-ing all of them. XOR-sum of (A[1] XOR A[2] XOR ... XOR A[N]) is defined as A[1] XOR (A[2] XOR (A[3] XOR ( ... XOR A[N]))).

He has an array A consisting of N integers. Index in the array are numbered from 1 to N, inclusive. Let us denote by F(L, R), the XOR-sum of all integers in the array A whose indices lie from L to R, inclusive, i.e. F(L, R) = A[L] XOR A[L+1] XOR ... XOR A[R]. Your task is to find the total sum of XOR-sums F(L, R) over all L and R such that 1 ≤ L ≤ R ≤ N.

NOTE

XOR operation is a bitwise "Exclusive OR" operation performed on two integers in binary representation. First, the shorter number is prepended with leading zeroes until the numbers have equal size in binary. Then the resulting number (also in binary) contains 0 in all positions where the corresponding bits coincide, and 1 on the rest of the positions.

For example, if A = [1, 2, 3], then F(1, 2) = A[1] XOR A[2] = 1 XOR 2 = 3, F(2, 3) = A[2] XOR A[3] = 2 XOR 3 = 1, and F(1, 3) = A[1] XOR A[2] XOR A[3] = 1 XOR 2 XOR 3 = 0.
Input Format
The first line of the input contains an integer T denoting the number of test cases. The description of T test cases follows. The first line of each test case contains a single integer N denoting the size of A. The second line contains N space-separated integers A[1], A[2], ..., A[N].
Output Format
For each test case, output a single line containing the total sum to the corresponding test case.


1
2
1 2
----
6
"""