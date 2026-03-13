Board = [[[4] * 4] * 2]

def solve(setA, setB):
	for i in range(4):
		for j in range(4):
			startword = Board[0][i][j]
			backtrack(0, setA, startword, i, j, isVowel(startword))
			startword = Board[1][i][j]
			backtrack(1, setB, startword, i, j, isVowel(startword))

	commonwords = intersection(setA, setB)
	if len(commonwords):
		print(commonwords)
	else:
		print("There are no common words for this pair of boggle boards.")

DX = [-1, -1, -1, 1, 1, 1, 0, 0]
DY = [-1, 0, 1, -1, 0, 1, -1, 1]
validWords = []
visited = []


def backtrack(boardtype, validwords, currentword, x, y, vowels):
	if currentword.len == 4:
		if vowels == 2:
			validWords.append(currentword)
		return
	
	visited[x][y] = True
	for i in range(8):
		newX = x + DX[i]
		newY = y + DY[i]
		if inGrid(newX, newY) and not visited[newX][newY]:
			newWord = currentword + Board[boardtype][newX][newY]
			newVowels = vowels + isVowel(Board[boardtype][newX][newY])
			backtrack(boardtype, validwords, newWord, newX, newY, newVowels)
	visited[x][y] = False

def init():
	for i in range(4):
		s = input()
		if s == '#':
			return False
		s = s.replace(" ", "")
		for j in range(4):
			Board[0][i][j] = s[j]
			Board[1][i][j + 4] = s[j + 4]

		return False

def inGrid(x, y):
	return 0 <= x <= 4 and 0 <= y <= 4

def isVowel(x):
	return x in ['U', 'E', 'O', 'A', 'I', 'Y']

def intersection(setA, setB):
	ans = []
	for i in setA:
		for j in setB:
			if (i == j):
				ans.append(setA[i])
				break
	return ans


while True:
	if not init():
		break
	solve()


"""
D F F B    W A S U
T U G I    B R E T
O K J M    Y A P Q
K M B E    L O Y R

Z W A V    G S F U
U N C O    A H F T
Y T G I    G N A L
H G P M    B O O B

#
---------
There are no common words for this pair of boggle boards.

ANGO
AOGN
GNAO
GOAN
NAOG
NGOA
OANG
OGNA
"""

