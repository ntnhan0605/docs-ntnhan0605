n = int(input())
arr = list(map(int,input().split()))
newArr = [0] * n
newArr[0] = prev = arr[0]
for i in range(1,n):
	newArr[i] = prev + arr[i]
	prev = arr[i]

print(" ".join(map(str, newArr)))