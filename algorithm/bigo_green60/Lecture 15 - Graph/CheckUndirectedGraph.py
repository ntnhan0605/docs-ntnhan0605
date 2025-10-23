"""
3
0 1 1
1 0 1
1 1 0

=> YES
"""

n = int(input())
arr = []
for i in range(n):
	arr.append(list(map(int, input().split())))

def CheckUndirectedGraph(arr, n):
	for i in range(n):
		for j in range(n):
			if arr[i][j] != arr[j][i] and i <= j:
				return "NO"
	return "YES"

print(CheckUndirectedGraph(arr, n))