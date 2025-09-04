"""
5 4 2
9 7 6 4 1
12 9 3 2

=> 3
"""

def merge(L, n1, R, n2, A, n):
	i = j = k = 0
	while i < n1 and j < n2:
		if L[i] < R[j]:
			A[k] = L[i]
			i += 1
		else:
			A[k] = R[j]
			j += 1
		k += 1
	while i < n1:
		A[k] = L[i]
		i += 1
		k += 1
	while j < n2:
		A[k] = R[j]
		j += 1
		k += 1


def mergeSort(ar, n):
	if n > 1:
		n1 = n // 2
		n2 = n - n1
		L = ar[:n1]
		R = ar[n1:]
		mergeSort(L, n1)
		mergeSort(R, n2)
		merge(L, n1, R, n2, ar, n)

m, n, k = map(int, input().split())
A = list(map(int, input().split()))
B = list(map(int, input().split()))
C = [0] * (m + n)

mergeSort(A, m)
mergeSort(B, n)
merge(A, m, B, n, C, m + n)
print(C[k])