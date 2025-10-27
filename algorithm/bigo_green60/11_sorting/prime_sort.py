def isPrime(n):
	if n <= 1:
		return False
	for i in range(2, int(n ** 0.5) + 1):
		if n % i == 0:
			return False
	return True

def insertAsc(arr, i, x):
	j = i - 1
	while j >= 0 and arr[j] > x:
		arr[j + 1] = arr[j]
		j-=1
	arr[j + 1] = x


def insertionSort(arr):
	for i in range(len(arr)):
		x = arr[i]
		insertAsc(arr, i, x)
		

n = int(input())
arr  = list(map(int, input().split()))
arrASC = [n for n in arr[0:] if not isPrime(n)]

insertionSort(arrASC)
j = 0
for i in range(len(arr)):
	if not isPrime(arr[i]):
		print(arrASC[j], end = " ")
		j+=1
	else:
		print(arr[i], end = " ")
print()