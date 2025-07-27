m, n = map(int, input().split())

a = []

for i in range(m):
	ai = list(map(int, input().split()))
	a.append(ai)

index = ''
sep = ''
for j in range(n):
	isAllNagetive = True
	if a[0][j] < 0:
		for i in range(1,m):
			if a[i][j] >= 0:
				isAllNagetive = False
		if isAllNagetive:
			index += sep + str(j)
			sep = " "

print(index)
		
	




# Cols negative
# Lặp trong các cột (j)
	# flag = True
	# Kiểm tra các dòng (i):
		# if a[i][j] > 0:
			# flag = False
			# beak;
