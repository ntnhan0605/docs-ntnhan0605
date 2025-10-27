"""
Grigoriy, giống như tên của một anh hùng bộ phim hài nổi tiếng, đã tìm được công việc làm một nhân viên bảo vệ ban đêm tại bảo tàng. Vào đêm đầu tiên, anh ta nhận được một chiếc máy dập nổi và phải đi kiểm tra toàn bộ khu trưng bày.

Máy dập nổi là một thiết bị cho phép người dùng in chữ trên cuộn băng keo. Chữ sẽ được in tuần tự, từng chữ một. Thiết bị gồm có một vòng quay gồm các ký tự tiếng Anh in thường xếp thành vòng tròn trên đó, một con trỏ đứng yên chỉ vào ký tự hiện tại và một nút bấm để in ký tự được chọn. Ở mỗi thao tác, vòng quay ký tự có thể quay một bước theo chiều kim đồng hồ hoặc ngược chiều kim đồng hồ.

Ban đầu, con trỏ chỉ vào ký tự 'a'. Những ký tự còn lại được xếp như hình bên dưới:

Sau khi Grigorly thêm một đồ vật mới vào kệ triển lãm, anh ta phải in tên của vật phẩm đó lên miếng băng keo và dán lên. Không bắt buộc phải trả vòng quay về vị trí bắt đầu với con trỏ chỉ vào ký tự 'a'.
Người anh hùng của chúng ta sợ rằng các vật triển lãm sẽ sống dậy và tấn công anh ta, cho nên anh ấy muốn in tên các đồ vật đó nhanh nhất có thể. Hãy giúp Grigoriy với mỗi chuỗi bất kỳ hãy tìm số lần quay ít nhất cần để in chuỗi đó.

Dữ liệu nhập
Một dòng duy nhất chứa tên của vật triển lãm - một chuỗi không rỗng có độ dài không quá 100 ký tự. Chuỗi được cho chỉ có các ký tự tiếng Anh in thường.

Dữ liệu xuất
In số một số nguyên - số lần quay ít nhất để in tên vật triển lãm được cho ở input.

Input:
ares
Output:
34

Input:
zeus
Output:
18

a => 97
z => 122

index array ky tu a..z: 0 -> 25 => length = 26
start : index = 0
index str[0] : 0 -> ord(str[0])
index str[1] : ord(str[0]) -> ord(str[1])

if ord(str) > 13 => 26 - ord(str)

"""

str = input()

def night_at_the_museum(str):
	total = 0
	temp = 0
	for s in str:
		idx = ord(s) - 97
		delta = abs(temp - idx)
		if delta > 13:
			total += abs(26 - delta)
		else:
			total += delta
		temp = idx

	return total

print(night_at_the_museum(str))
