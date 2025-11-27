"""
Input: n dòng. mỗi dòng 1 số nguyên a[i]
a[i] đại diện số lá bài từ 1 -> a[i]
thực hiện hành đồng (chỉ khi nào có ít nhất 2 lá)
Hành động 1 : xóa lá trên cùng
Hành động 2 : di chuyển lá trên cùng xuống cuối.
Lá ở HD2 : lá trên cùng sau khi remove lá ở HD1.

Output: dãy các lá bài đã bị remove và lá cuối cùng.

# Throwing Cards Away I
 
# Ý TƯỞNG:
# input: n dòng. mỗi dòng là 1 số nguyên a[i]
# a[i] đại diện số lá bài từ: 1 -> a[i]
# thực hiện hành động(chỉ khi nào có ít nhất 2 lá)
# Hành động 1: xóa lá trên cùng
# Hành động 2: di chuyển lá trên cùng xuống cuối.
# lá ở HD2: lá trên cùng sau khi remove lá ở HD1
 
#Output: dãy các lá bài đã bị remove, và lá cuối cùng.
# 2 dòng: dòng 1: lá bị bỏ - dòng 2: lá còn lại cuối.
 
# HD1: bỏ lá đầu tiên, lá đầu tiên đi vào trước => 
# FIRST IN FIRST OUT: Queue
# queue<int> array;
# vector<int> discarded_card;
# bước 1: đọc input: while true: n == 0: break
# for i from 1 to n: array.push(i):
# while: array.size() >= 2
# HD1: discarded_cards.push_back(array.front())
# discarded_cards.pop()
# HD2: array.push(array.front())
# array.pop()
 
# in ra: discarded_card[i from 0 to n - 1]
# và: remains: array.front()
"""

"""
input
7
19
10
6
0
output
Discarded cards: 1, 3, 5, 7, 4, 2
Remaining card: 6
Discarded cards: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 4, 8, 12, 16, 2, 10, 18, 14
Remaining card: 6
Discarded cards: 1, 3, 5, 7, 9, 2, 6, 10, 8
Remaining card: 4
Discarded cards: 1, 3, 5, 2, 6
Remaining card: 4
"""

import queue


while True:
	n = int(input())
	if n == 0:
		break
	q = queue.Queue()
	for i in range(1, n + 1):
		q.put(i)
	sep = ''
	discardCards = ''
	while q.qsize() >= 2:
		discardCards += sep + str(q.get())
		sep = ", "
		q.put(q.get())
	if len(discardCards) != 0:
		print(f'Discarded cards: {discardCards}')
	else:
		print('Discarded cards:')
	print(f'Remaining card: {q.get()}')	
