n = int(input())
arr = []
for i in range(n):
	ai = list(map(int, input().split()))
	arr.append(ai)

def CreateAnAdjacencyList(arr, n):
	count = 0
	edges = []
	for i in range(n):
		for j in range(n):
			if arr[i][j] == 1:
				edges.append(f"{i} {j}")
				count += 1
	print(count)
	print("\n".join(edges))

CreateAnAdjacencyList(arr, n)