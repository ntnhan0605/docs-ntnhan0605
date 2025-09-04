txt = input()
chan = []
le = []
for i in range(len(txt)):
	if (i + 1) % 2 == 0:
		chan.append(txt[i])
	else:
		le.append(txt[i])

chan = chan[::-1]

ans = ""
j = k = 0
for i in range(len(txt)):
	if (i + 1) % 2 == 0:
		ans += chan[j]
		j += 1
	else:
		ans += le[k]
		k += 1

print(ans)