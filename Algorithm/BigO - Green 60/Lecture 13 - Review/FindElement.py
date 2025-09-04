def FindElement(arr, value):
	index = -1
	for i in range(len(arr)):
		if arr[i] == value:
			index = i
			break
	return index + 1 if index != -1 else index

n, val = map(int,input().split())
arr = list(map(int, input().split()))
print(FindElement(arr, val))