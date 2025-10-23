"""
Test case 1:
2
0 1
1 0
Expect case 1:
1
0 1



Test case 2:
4
0 1 1 0
1 0 1 1
1 1 0 1
0 1 1 0
Expect case 2:
5
0 1
0 2
1 2
1 3
2 3


"""

n = int(input())
arr = []
for i in range(n):
	arri = list(map(int, input().split()))
	arr.append(arri)

mtx = []
for i in range(n):
	for j in range(n):
		if arr[i][j] == 1 and i <= j:
			mtx.append(f"{i} {j}")

print(len(mtx))
for i in range(len(mtx)):
	print(mtx[i])