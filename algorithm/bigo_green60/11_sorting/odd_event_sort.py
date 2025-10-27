"""
odd desc
even asc
"""
# Asc
def insertAsc(arr, i, x):
	j = i
	while j > 0:
		if (arr[j - 1] <= x):
			break
		arr[j] = arr[j - 1]
		j -= 1
	arr[j] = x

def insertSort(arr, n):
	for i in range(n):
		x = arr[i]
		insertAsc(arr, i, x)

# Desc
def merge(L, n1, R, n2, arr, n):
	i = j = k = 0
	while i < n1 and j < n2:
		if L[i] > R[j]:
			arr[k] = L[i]
			i+=1
		else:
			arr[k] = R[j]
			j+=1
		k+=1
	while i < n1:
		arr[k] = L[i]
		i+=1
		k+=1
	while j < n2:
		arr[k] = R[j]
		j+=1
		k+=1

def mergeSort(arr, n):
	if n > 1:
		n1 = n // 2
		n2 = n - n1
		L = arr[:n1]
		R = arr[n1:]
		mergeSort(L, n1)
		mergeSort(R, n2)
		merge(L, n1, R, n2, arr, n)

n = int(input())
arr = list(map(int, input().split()))
odd = []
even = []
for i in range(n):
	if arr[i] % 2 == 0:
		even.append(arr[i])
	else:
		odd.append(arr[i])


insertSort(even, len(even))
mergeSort(odd, len(odd))

# print(" ".join(map(str, even)))
# print(" ".join(map(str, odd)))

oi = ei = 0
for i in range(n):
	if arr[i] % 2 == 0:
		print(even[ei], end = " ")
		ei += 1
	else:
		print(odd[oi], end = " ")
		oi += 1

print()
