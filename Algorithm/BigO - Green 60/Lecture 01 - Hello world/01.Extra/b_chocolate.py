n = int(input())
bar = input()

cnt = 0
for i in range(len(bar)):
	bari = bar[i]
	if bari == '1':
		cnt += 1
		for j in range(i, len(bar)):
			barj = bar[j]
			if barj == '1':
				cnt+=1

print(cnt)
