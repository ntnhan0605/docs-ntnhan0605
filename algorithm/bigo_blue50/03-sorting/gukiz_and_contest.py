"""
input
3
1 3 3
output
3 1 1

input
1
1
output
1

input
5
3 5 3 4 5
output
4 1 4 3 1

"""
n = int(input())
scores = list(map(int, input().split()))

def gukiz_and_contest(scores, n):
	sortScores = sorted(scores, reverse=True)
	levels = [0] * 2_001
	count = 0
	level = 1
	score = sortScores[0]
	for i in range(n):
		count += 1
		if score != sortScores[i]:
			level = max(count, level + 1)
			score = sortScores[i]
		levels[sortScores[i]] = level
	
	for i in range(n):
		print(levels[scores[i]],end = ' ')

	print()
gukiz_and_contest(scores, n)