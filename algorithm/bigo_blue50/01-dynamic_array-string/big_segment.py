"""
Một đường thẳng trên trục tọa độ có n phân đoạn, phân đoạn thứ i bắt đầu tại vị trí li và kết thúc tại vị trí ri, phân đoạn này được ký hiệu là [li , ri].
Bạn cho rằng có một phân đoạn bao lấy tất cả các phân đoạn còn lại. Nói cách khác, có một phân đoạn trong các phân đoạn đã cho chứa các phân đoạn khác. Tìm trong tập các phân đoạn được cho, phân đoạn bao lấy các phân đoạn còn lại, và in ra số thứ tự của nó. Nếu không tồn tại phân đoạn thỏa mãn thì in -1.
Một cách chặt chẽ, một phân đoạn [a,b] bao lấy phân đoạn [c,d] nếu thỏa mãn điểu kiện a ≤ c ≤ d ≤ b.

Dữ liệu nhập
Dòng đầu tiên chứa một số nguyên n ( 1 ≤ n ≤ 10^5 ) - số lượng đoạn hiện có.

n dòng tiếp theo, mỗi dòng chứa thông tin của một phân đoạn. Dòng thứ i chứa hai số nguyên li, ri ( 1 ≤ li ≤ ri ≤ 10^9 ) cách bởi khoảng trắng - hai biên của phân đoạn i.

Đảm bảo rằng không tồn tại hai phân đoạn trùng nhau.

Dữ liệu xuất
In ra số thứ tự của đoạn thỏa yêu cầu đề bài. Nếu không có đoạn nào như vậy thì in ra -1.

Các phân đoạn được đánh số thứ tự từ 1 theo thứ tự xuật hiện của input.

Input
3
3 3
4 4
5 5
Output
-1

Input
6
1 5
2 3
1 10
7 10
7 7
10 10
Output
3

"""

# n = int(input())
# arr = []
# baseSgm = [9_999,0]
# idxBigSgm = 0
# for i in range(n):
# 	[l, r] = map(int, input().split())
# 	if baseSgm[1] - baseSgm[0] < r - l and baseSgm[0] > l or baseSgm[1] < r:
# 		baseSgm[0] = l
# 		baseSgm[1] = r
# 		idxBigSgm = i
# 	arr.append([l, r])

# def big_segment(arr, n, idx, bigSegment):
# 	if bigSegment[0] == 9_999 and bigSegment[1] == 0:
# 		return -1
# 	count = 0
# 	[l, r] = bigSegment
# 	for i in range(n):
# 		[li, ri] = arr[i]
# 		if l <= li and li <= ri and ri <= r:
# 			count += 1
# 	return idx + 1 if count == n else -1
# print(big_segment(arr, n, idxBigSgm, baseSgm))


n = int(input())
arr = []
for i in range(n):
	ai = list(map(int, input().split()))
	arr.append(ai)

def max_big_segment(arr, n):
	idxBigSgm = -1
	bigSegment = [9_999, 0]
	for i in range(n):
		[l, r] = bigSegment
		[li, ri] = arr[i]
		if r - l < ri - li:
			bigSegment[0] = li
			bigSegment[1] = ri
			idxBigSgm = i
	return idxBigSgm

def big_segment(arr, n):
	idxBigSgm = max_big_segment(arr, n)
	if idxBigSgm == -1:
		return -1
	[l, r] = arr[idxBigSgm]
	count = 0
	for i in range(n):
		[li, ri] = arr[i]
		if l <= li and li <= ri and ri <= r:
			count += 1
	return idxBigSgm + 1 if count == n else -1

print(big_segment(arr, n))
