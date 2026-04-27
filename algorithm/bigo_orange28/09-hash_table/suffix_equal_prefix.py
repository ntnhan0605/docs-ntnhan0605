def convert(ch):
	return ord(ch) - ord('a') + 1

def main():
	T = int(input())
	for _ in range(T):
		s = input()
		n = len(s)
		MOD1 = 1e9 + 7
		MOD2 = 1e9 + 9
		BASE1 = 31
		BASE2 = 29

		prefHash1 = 0
		prefHash2 = 0
		sufHash1 = 0
		sufHash2 = 0

		p1 = 1
		p2 = 1
		for i in range(n):
			prefHash1 = (prefHash1 * BASE1 + convert(s[i - 1])) % MOD1
			prefHash2 = (prefHash2 * BASE2 + convert(s[i - 1])) % MOD2
			sufHash1 = (convert(s[n - i]) * p1 + sufHash1) % MOD1
			sufHash2 = (convert(s[n - i]) * p1 + sufHash2) % MOD2

			if prefHash1 == sufHash1 and prefHash2 == sufHash2:
				answer


"""
3
ababab
aaaa
abcabc
----
Case 1: 2
Case 2: 3
Case 3: 1
"""

