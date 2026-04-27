def KMPPreprocess(p):
	pass

def KMPSearch(S,p,prefix):
	pass



def main():
	n, w = list(map(int, input().split()))
	a = list(map(int, input().split()))
	b = list(map(int, input().split()))
	if w == 1:
		print(n)
	else:
		dA = []
		for i in range(n - 2):
			dA[i] = a[i + 1] - a[i]
		dB = []
		for i in range(w - 2):
			dB[i] = b[i + 1] - b[i]
		prefix = KMPPreprocess(dB)
		ans = KMPSearch(dA, dB, prefix)
	
main()

"""
13 5
2 4 5 5 4 3 2 2 2 3 3 2 1
3 4 4 3 2
----
2
"""