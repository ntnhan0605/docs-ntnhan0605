count = [0] * 52
indexA = ord("A")
indexa = ord("a")

def FirstRepeatingCharacter(txt):
	ans = "null"
	index = -1
	for i in range(len(txt)):
		orderI = ord(txt[i])
		if orderI >= indexa:
			idx = orderI - indexa + 26
			count[idx] += 1
			if count[idx] >= 2:
				index = idx
				break
		elif orderI >= indexA:
			idx = orderI - indexA
			count[idx] += 1
			if count[idx] >= 2:
				index = idx
				break
			
	if index >= 26:
		ans = chr(indexa + index - 26)
	elif index >= 0:
		ans = chr(indexA + index)

	return ans

text = input()
print(FirstRepeatingCharacter(text))
