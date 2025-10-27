s = input()

arr = ['B', 'I', 'G', 'O']

def isHasCharacter(ch):
	for character in arr:
		if ord(ch) == ord(character):
			return True
	return False

hasCharacter = False
s_upper = s.upper()
for i in range(len(s_upper)):
	if isHasCharacter(s_upper[i]):
		hasCharacter = True
		break

print("YES" if hasCharacter else "NO")
