# def is_valid_sudoku(board):
# 	for i in range(9):
# 		row = set()
# 		col = set()
# 		block = set()
# 		for j in range(9):
# 			# Kiểm tra hàng
# 			if board[i][j] != '.' and board[i][j] in row:
# 					return False
# 			row.add(board[i][j])

# 			# Kiểm tra cột
# 			if board[j][i] != '.' and board[j][i] in col:
# 					return False
# 			col.add(board[j][i])

# 			# Kiểm tra ô 3x3
# 			row_idx = 3 * (i // 3)
# 			col_idx = 3 * (i % 3)
# 			r = row_idx + j // 3
# 			c = col_idx + j % 3
# 			if board[r][c] != '.' and board[r][c] in block:
# 					return False
# 			block.add(board[r][c])
# 	return True
 
# a = []
# for i in range(9):
# 	ai = list(map(int, input().split()))
# 	a.append(ai)
# print("YES" if is_valid_sudoku(a) else "NO")


"""
Kiểm tra 3 điều kiện
1. Mỗi hàng phải bao gồm các số từ 1 đến 9
2. Mỗi cột bao gồm các số từ 1 đến 9
3. Mỗi ô bảng con 3x3 gồm các số từ 1 đến 9

Nếu cả 3 điều kiện thỏa thì YES
ngược lại thì NO

Gọi bảng SUDOKU là mat[9][9]
1. Check hàng: cố định index i -> duyệt j chạy để kiểm trả giá trị mat[i][j]
2. Check cột: cố định index i -> duyệt j chạy để kiểm tra giá trị mat[j][i]
3. Check bảng
	Đi tính ô xuất phát trước -> duyệt hết 9 ô từ ô xuất phát
	for i in range(0, 9, 3):
		for j in range(0, 9, 3):
"""

def check_row(i):
	cnt = [0] * 10
	for j in range(9):
		if (cnt[mat[i][j]]) == 1:
			return False
		cnt[mat[i][j]] += 1
	return True

def check_column(i):
	cnt = [0] * 10
	for j in range(9):
		if (cnt[mat[j][i]]) == 1:
			return False
		cnt[mat[j][i]] += 1
	return True

def check_sub_mat(start_i, start_j):
	cnt= [0] * 10
	for i in range(start_i, start_i + 3):
		for j in range(start_j, start_j + 3):
			if cnt[mat[i][j]] == 1:
				return False
			cnt[mat[i][j]] += 1
	return True

def check():
	for i in range(9):
		if not check_row(i) or not check_column(i):
			return False
	for start_i in range(0, 9, 3):
		for start_j in range(0, 9, 3):
			if not check_sub_mat(start_i, start_j):
				return False
	return True

mat = []
for _ in range(9):
	mat.append(list(map(int, input().split())))

print("YES" if check(mat) else "NO")

