f = []
s = ''
def dp(l, r):
	if l == r:
		f[l][r] = 1
		return 1
	if l + 1 == r and s[l] == s[r]:
		f[l][r] = 1
		return 2
	if f[l][r] != -1:
		return f[l][r]
	ans = 0
	if s[l] == s[r]:
		if dp(l +1, r+1)>0:
			ans = dp(l, l+ (r - l + 1)/ 2 -1 ) + 1
		f[l][r] = ans
	return ans

def main():
	s = input()
	for i in range(len(s)):
		for j in range(len(s)):
			f[i][j] = -1
	
	for i in range(len(s), 1, -1):
		cnt[i] += cnt[i + 1]

	for i in range(1, len(s)):
		print()
	
	

"""
abacaba
----
12 4 1 0 0 0 0

abba
----
6 1 0 0
"""