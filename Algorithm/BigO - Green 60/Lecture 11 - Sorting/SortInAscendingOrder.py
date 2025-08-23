def sort_in_ascending_order(arr):
	for i in range(len(arr)):
		for j in range(i + 1, len(arr)):
			if arr[i] > arr[j]:
				tmp = arr[i]
				arr[i] = arr[j]
				arr[j] = tmp
	
	return arr

n = int(input())
arr = list(map(int, input().split()))

print(" ".join(map(str,sort_in_ascending_order(arr))))