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
mergeSort(arr, n)
# print(" ".join(map(str, arr)))
if n % 2 == 1:
	index = n // 2
	print(arr[index])
else:
	idx1 = n // 2 - 1
	idx2 = n // 2
	media = (arr[idx1] + arr[idx2]) / 2
	print(f"{media:.1f}")