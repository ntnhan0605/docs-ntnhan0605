def LCS(s, t): 
	pass

def readArr():
	arr = []
	while read(x) and x!=0:
		arr.add(x)
	return arr 

def main():
	d = int(input())
	for _ in range(d):
		agnes = readArr()
		ans = 0
		while True:
			tom = readArr()
			if tom is empty:
				break
			ans = max(ans, LCS(agnes, tom))
		print(ans)


main()

"""
3
1 2 3 4 5 6 7 8 9 0
1 3 8 2 0
2 5 7 8 9 0
1 1 1 1 1 1 2 3 0
1 3 1 3 5 7 8 9 3 4 0
1 2 35 0
0
1 3 5 7 0
3 7 5 1 0
0
1 2 1 1 0
1 1 1 0
0
----
6
2
3
"""