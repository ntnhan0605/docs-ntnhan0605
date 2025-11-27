"""
input
4
0 1 0 10
output
1

input
2
0 0
output
2

input
10
1 1 3 0 0 0 2 1 0 3
output
3
"""

n = int(input())
arr = list(map(int,input().split()))

def wrath(arr, n):
	
	danger = n + 1
	live = 0
	for i in range(n - 1 , -1, -1):
		if i + 1 < danger:
			live += 1
		danger = min(danger, i + 1 - arr[i])
	print(f'{live}')

wrath(arr, n)
		
