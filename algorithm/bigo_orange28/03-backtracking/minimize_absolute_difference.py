a = []
resultNum = 1_000_000_00
resultDenom = 1
tmp = []
used = [False] * 5
answer = []

def compare(newNum, newDenom):
	return newNum * resultDenom < resultNum * newDenom

def calculate(tmp):
	newNum = abs(a[tmp[0]] * a[tmp[3]] - a[tmp[1]] * a[tmp[2]])
	newDenom = a[tmp[1]] * a[tmp[3]]
	if compare(newNum, newDenom) == True:
		answer = tmp[0:]
		resultNum = newNum
		resultDenom = newDenom
	return

def backtracking(pos, tmp, used):
	if pos == 4:
		calculate(tmp)
	for i in range(5):
		if not used[i]:
			tmp.append(i)
			used[i] = True
			backtracking(pos + 1, tmp, used)
			tmp.pop()

a = list(map(int, input().split()))

backtracking(0, tmp, used)

print(answer)
for x in answer:
	print(x, ' ')

"""
2 3 5 7 11
----
0 3 1 4

1 1 1 1 1
----
0 1 2 3

8 2 4 2 6
----
1 0 3 4

10000 4 10 4 10
----
1 2 3 4
"""