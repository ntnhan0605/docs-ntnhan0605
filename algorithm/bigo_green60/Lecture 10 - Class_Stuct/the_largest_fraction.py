"""
## 2 cách
cách 1: tính ra giá trị từng phân số (số thực), sau đó so sánh (Không khuyến khích)
	-> Có thể bị sai số khi so sánh số thực. 0.00000001 0.999999999 == 1

cách 2: a / b và c / d
	- Nếu a / b > c / d => a / b - c / d > 0 
		<=> (a*d - b*c) / (b * d) > 0
		<=> a * d - b * c > 0 (Vì luôn luôn b * d > 0)
		<=>	a * d > b * c
	- Ngược lại : a * d < b * c

=> Khi so sánh 2 phần số a / b và c / d chỉ cần so sánh a * d và b * c
"""

class Fraction:
	def __init__(self, num = 0, denom = 1):
		self.num = num
		self.denom = denom

	def __str__(self):
		return f"{self.num} {self.denom}"
	
	def gcb(self):
		a = self.num
		b = self.denom
		while b != 0:
			reminder = a % b
			a = b
			b = reminder
		return a 
	
	# reduceFraction
	def reduceFraction(self):
		c = self.gcb(self.num, self.denom)
		self.num //= c
		self.denom //= c
	
	def isBiggerThan(self, frac):
		return self.num * frac.denom > self.denom * frac.num

n = int(input())

arr = []
for i in range(n):
	num, denom = map(int, input().split())
	arr.append(Fraction(num, denom))

ans = arr[0]
for i in range(1, n):
	ai = arr[i]
	if ai.isBiggerThan(ans):
		ans = ai

ans.reduceFraction()
print(ans)