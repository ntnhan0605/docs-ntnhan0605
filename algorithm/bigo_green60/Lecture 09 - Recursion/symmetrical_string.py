import sys;

sys.setrecursionlimit(100001)
def symmetrical_string(s, i, j):
	if i >= j:
		return "YES"
	if s[i] != s[j]:
		return "NO"
	return symmetrical_string(s, i + 1, j - 1)

n = int(input())
s = input()

print(symmetrical_string(s, 0, len(s) - 1))