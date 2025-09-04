def PalindromeString(txt):
	n = len(txt)
	for i in range(n // 2):
		j = n - i - 1
		if txt[i] != txt[j]:
			return False
	return True

n = int(input())
text = input()
print("YES" if PalindromeString(text) else "NO")