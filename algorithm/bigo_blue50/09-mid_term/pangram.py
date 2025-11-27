"""
input
12
toosmallword
output
NO

input
35
TheQuickBrownFoxJumpsOverTheLazyDog
output
YES
"""
n = int(input())
text = input()

def pangram(text, n):
	if n < 26:
		return False
	count = [0] * 26
	for txt in text:
		if ord('A') <= ord(txt) and ord(txt) <= ord('Z'):
			count[ord(txt) - ord('A')] += 1
		else:
			count[ord(txt) - ord('a')] += 1

	for c in count:
		if c == 0:
			return False
	return True

print("YES" if pangram(text, n) else "NO")