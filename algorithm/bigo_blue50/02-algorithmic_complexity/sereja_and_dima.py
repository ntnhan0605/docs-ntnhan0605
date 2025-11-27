"""
input
4
4 1 2 10
output
12 5

input
7
1 2 3 4 5 6 7
output
16 12
"""

n = int(input())
arr = list(map(int, input().split()))
def sereja_and_dima(arr, n):
	i = 0
	j = n - 1
	dima = 0
	sere = 0
	count = 0 ## turn = 0 ---> 0: Sereja 1: Dima
	while i <= j:
		if count % 2 == 0: ## if turn == 0:
			sere += max(arr[i], arr[j])
		else:
			dima += max(arr[i], arr[j])
		if arr[i] < arr[j]:
			j -= 1
		else:
			i += 1
		count += 1 ## turn ^= 1
	print(f'{sere} {dima}')

sereja_and_dima(arr, n)

