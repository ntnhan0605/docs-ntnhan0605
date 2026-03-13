# backtracking
"""
def backtracking(currentState, ...otherParams):
	if currentState is a solution then
		processSolution(currentState)
	if currentState is invalid then
		exit
	for nextStep can move from currentState
		apply nextStep to currentState
		backtracking(currentState, ...otherParams)
		remove nextStrep from currentState
"""



def check(board, row, col, N):
	# check Vertical
	for i in range(row):
		if board[i][col]:
			return False
		
	# check Main diagonal
	i = row
	j = col
	while i >= 0 and j >=0:
		if board[i][j]:
			return False
		i -= 1
		j -= 1

	# check Secondary diagonal
	i = row
	j = col
	while j < N and i >=0:
		if board[i][j]:
			return False
		i -= 1
		j += 1

	return True
	




# permutations of string
def permutation(s, l, r):
	if l == r:
		print(''.join(s))
	else:
		for i in range(l, r):
			s[l], s[i] = s[i], s[l]
			permutation(s, l + 1, r)
			s[l], s[i] = s[i], s[l]

# distict permucations of string
def shouldSwap(s, start, end):
	for i in range(start, end):
		if s[i] == s[end]:
			return False
	return True
def distinctPermutation(s, l, r):
	if l >= r:
		return
	for i in range(l, r):
		if shouldSwap(s, l, r):
			s[l], s[i] = s[i], s[l]
			distinctPermutation(s, l + 1, r)
			s[l], s[i] = s[i], s[l]
