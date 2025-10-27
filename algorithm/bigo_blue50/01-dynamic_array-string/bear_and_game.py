"""
Bear Limak thích xem thể thao trên TV. Anh ta dự định sẽ xem một trận đấu hôm nay. Trận đấu dài 90 phút không có giải lao.

Mỗi phút trận đấu có thể là gay cấn hoặc nhàm chán. Nếu 15 phút liên tục nhàm chán thì Limak sẽ tắt TV ngay lập tức.

Bạn biết rằng có n phút gay cấn tại thời điểm t1, t2, t3,...,tn ​. Nhiệm vụ của bạn là tính xem Limak sẽ xem bao nhiêu phút của trận đấu.


Dữ liệu nhập
Dòng đầu tiên chứa một số nguyên n (1 ≤ n ≤ 90) - số lượng đoạn gây cấn.
Dòng tiếp theo gồm n n số nguyên t1, t2, t3,..., tn ( 1 ≤ t1 < t2 < t3 < . . . < tn ≤ 90 ) được cho theo thứ tự tăng dần.

Dữ liệu xuất
In số phút Limak xem trận đấu.

Input
3
7 20 88
Output
35

Input
9
16 20 30 40 50 60 70 80 90
Output
15

Input
9
15 20 30 40 50 60 70 80 90
Output
90

"""

n = int(input())
arr = list(map(int, input().split()))

def bear_and_game(arr, n):
	temp = 0
	for i in range(n):
		ai = arr[i]
		if (abs(ai - temp) > 15):
			return temp + 15
		temp = ai
	return 90 if temp > 75 else temp + 15

print(bear_and_game(arr, n))