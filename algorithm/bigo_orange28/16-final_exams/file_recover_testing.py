


"""
File Recover Testing
In a recent programming contest appeared a problem named File Recover . In that problem, repeated strings of a given text were to be counted. You are preparing test cases for that problem, and in order to test for border cases you want to generate a text with many repetitions of a particular string.

Of course, test cases cannot be arbitrarily long, so you decided to choose a length and a string, and then fit in a text of that length as many repetitions as possible of the string. For instance, if the length is 14 and the string is abcab , you may generate the text abcabcabcabcab whose length is 14 and where the string abcab appears 4 times (starting at positions 1, 4, 7 and 10).

You would like to know how good your idea is before implementing. Given a length and a string, you must determine the maximum number of times the characters of the string can appear consecutively in a text of that length.


14 abcab
1000 abcde
1000000000 z
1 zzzzz
-1 *
----
4
200
1000000000
0
"""

def KMP(S):
	n = len(S)
	pi = [0] * n
	for i in range(1, n):
		j = pi[i-1]
		while j >	0 and S[i] != S[j]:
			j = pi[j-1]
		if S[i] == S[j]:
			j += 1
		pi[i] = j
	return pi

def solve(L, S):
	n = len(S)
	if n > L:
		return 0
	pi = KMP(S)
	overlap_len = pi[n-1]
	unique_len = n - overlap_len
	ans = 1 + (L - n) // unique_len
	return ans

while True:
	L, S = input().split()
	L = int(L)
	if L == -1:
		break
	print(solve(L, S))