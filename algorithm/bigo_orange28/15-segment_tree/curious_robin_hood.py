
def buildTree(a, segment, l, r, index):
	if l == r:
		segment[index] = a[l]
		return
	mid = (l+ r) / 2
	buildTree(a, segment, l, mid, index * 2 + 1)
	buildTree(a, segment, mid + 1, r, index * 2 + 2)
	segment[index] = segment[index * 2 + 1] + segment[index * 2 + 2]
	return

def update(segment, l, r, index, pos, val):
	if pos < l or pos > r:
		return 
	if l == r:
		segment[index] += val
		return
	mid = (l + r) / 2
	if pos <= mid :
		update (segment, l, mid, 2 * index + 1, pos, val)
	else:
		update (segment, mid + 1, r, 2 * index + 2, pos, val)
	segment[index] = segment[index * 2 + 1] + segment[index * 2 + 2]

def sumRange(segment, l, r, index, fr, to):
	if fr <= l and r <= to:
		return segment[index]
	
	if fr > r or to < l:
		return 0
	
	mid = (l + r) / 2
	return sumRange(segment, l, mid, index * 2 + 1, fr, to) + sumRange(segment, mid + 1, r, index * 2 + 2, fr, to)

def main():
	tc = int(input())
	for i in range(1, tc + 1):
		n , q = list(map(int(input().split())))
		a = list(map(int, input().split()))
		sizeTree = 4 * n
		segment = [sizeTree]
		buildTree(a, segment, 0, n - 1, 0)
		print("Case ", tc, ":\n")
		for i in range(1):
			query = input()
			if query == 1:
				x = input()
				print(a[x], "\n")
				update(segment, 0, n - 1, 0, x, -a[x])
				a[x] = 0
			elif query == 2:
				x, val
				update(segment, 0, n - 1, 0, x, val)
			elif query == 3:
				l, raise
				print(sumRange(segment, 0, n - 1, 0, l, r))

main()

"""
1
5 6
3 2 1 4 5
1 4
2 3 4
3 0 3
1 2
3 0 4
1 1
----
Case 1:
5
14
1
13
2
"""