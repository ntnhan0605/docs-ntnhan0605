"""
Bizon The Champion không chỉ là một chú bò rừng. Anh ấy còn là một sở thích của nhóm "Bizons".
Ở một cuộc thi nọ đội "bizons" đã gặp bài toán sau: "Bạn được cho hai từ phân biệt (chuỗi các chữ cái tiếng Anh), s và t. Bạn cần phải chuyển từ s thành từ t".

Bài toán trông có vẻ đơn giản với họ vì họ hiểu rõ cấu trúc dữ liệu hậu tố. Bizon Senior thích suffix automaton. Bằng cách áp dụng nó một lần vào một chuỗi, anh ta có thể xóa khỏi chuỗi này bất kỳ ký tự nào. Bizon Middle hiểu rõ suffix array. Bằng cách áp dụng nó một lần vào một chuỗi, anh ta có thể đổi vị trí bất kỳ hai ký tự nào của chuỗi này. Các chàng trai không biết gì về suffix tree, nhưng nó có thể giúp họ làm nhiều hơn nữa.
Bizon The Champion tự hỏi liệu "Bizons" có thể giải quyết vấn đề hay không. Có lẽ giải pháp không yêu cầu cả hai cấu trúc dữ liệu. Tìm hiểu xem các chàng trai có thể giải quyết vấn đề hay không và nếu họ có thể, làm thế nào để họ làm điều đó? Họ có thể giải quyết nó chỉ bằng cách sử dụng suffix automaton hoặc chỉ khi sử dụng suffix array hoặc họ cần cả hai cấu trúc? Lưu ý rằng bất kỳ cấu trúc nào có thể được sử dụng một số lần không giới hạn, các cấu trúc có thể được sử dụng theo bất kỳ thứ tự nào.

Dữ liệu nhập
Dòng đầu tiên chứa một từ khác rỗng s. Dòng thứ 2 chứa một từ khác rỗng t.
Hai từ s và t khác nhau. Mỗi từ chỉ chứa các chữ cái tiếng Anh in thường. Mỗi từ chứa tối đa 100 chữ cái.

Dữ liệu xuất
In ra đáp án trên một dòng duy nhất:
In ra "need tree" (không có dấu "") nếu từ s không thể biến đổi thành từ t ngay cả khi sử dụng cả suffix array và suffix automaton.
In ra "automaton" (không có dấu "") nếu bạn chỉ cần suffix automaton để giải quyết bài toán.
In ra "array" (không có dấu "") nếu bạn chỉ cần suffix array để giải quyết bài toán.
In ra "both" (không có dấu "") nếu bạn cần cả hai dữ liệu để giải quyết bài toán.

Đảm bảo rằng nếu bạn chỉ có thể giải quyết vấn đề bằng cách sử dụng suffix array, thì không thể giải quyết nó chỉ bằng cách sử dụng suffix automaton. Điều này cũng đúng với suffix automaton.

Input
automaton
tomat
Output
automaton

Input
array
arary
Output
array

Input
both
hot
Output
both

Input
need
tree
Output
need tree

BIẾN ĐỔI/HOÁN VỊ/KHÔNG QUAN TRỌNG THỨ TỰ 
=> SỬ DỤNG PHÂN PHỐI (COUNT SỐ LƯỢNG PHẦN TỬ)
"""

s = input()
t = input()

def suffix_structures(s, t):
	need_tree = False
	automaton = False
	array = False
	countS = [0] * 26
	countT = [0] * 26
	
	# Đếm phân phối
	for si in s:
		countS[ord(si) - ord('a')] += 1
	for ti in t:
		countT[ord(ti) - ord('a')] += 1
	
	# Kiểm tra automaton và need_tree
	for i in range(26):
		if countS[i] > countT[i]:
			automaton = True
		if countS[i] < countT[i]:
			need_tree = True
	
	# Kiểm tra array
	index_found = 0
	match = -1 # vị trí đã tìm được ký tự trước đó
	for ti in t:
		index_found = s.find(ti, match + 1)
		if index_found > match:
			match = index_found
		else:
			array = True
			break
	
	# Kết luận
	if need_tree:
		return "need tree"
	else:
		if automaton and array:
			return 'both'
		elif automaton:
			return 'automaton'
		else:
			return 'array'

print(suffix_structures(s, t))