"""
5
1 0 0 0 1
3
2 4
1 5
3 5

0 3
0 3
1 2
"""

N = int(input())
X = list(map(int, input().split()))
prefixSum = [0] * (N + 1)
for i in range(1, N + 1):
	prefixSum[i] = prefixSum[i - 1] + X[i - 1]

# print(prefixSum)
q = int(input())
for i in range(q):
	L, R = list(map(int, input().split()))
	count = prefixSum[R] - prefixSum[L - 1]
	print(count % 2, R - L + 1 - count)
