def removeWhiteSpace(s):
	res = ''
	for ch in s:
		if ch != ' ':
			res += ch
	return res

def KMPPreprocess(S, prefix):
	prefix[0] = 0
	m = len(S)
	j = 0
	for i in range(1, m):
		while j > 0 and S[i] != S[j]:
			j = prefix[j - 1]

		if S[i] == S[j]:
			j += 1
		prefix[i] = j

def KMPSearch(s, S, prefix):
	n = len(s)
	m = len(S)
	j = 0
	for i in range(n):
		while j > 0 and s[i] != S[j]:
			j = prefix[j - 1]
		if s[i] == S[j]:
			j += 1
		if j == m:
			print('Found pattern at index : ', i - j + 1)
			j = prefix[j - 1]

def main():
	T = int(input())
	for tc in range(1, T + 1):
		S = input()
		S = removeWhiteSpace(S)
		s = input()
		prefix = [len(s)]
		KMPPreprocess(s, prefix)
		count = KMPSearch(S, s, prefix)
		print(f'Case {tc}: {count}')

main()

"""
4
axb ycz d
abc
ab  cab cabc abc
abc
aab acbaa bbaaz
aab
aaaaaa
aa
----
Case 1: 0
Case 2: 4
Case 3: 2
Case 4: 5
"""