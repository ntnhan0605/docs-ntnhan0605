"""
class/struct
	attributes / properties / data members / thuộc tính
"""



class Fraction:
	# initialize
	# construct là hàm quy định để tạo ra giá trị cho object đó
	def __init__(self, x = 0, y = 1):
		# attributes / properties / data members / thuộc tính
		self.num = x
		self.denom = y

	# toString() là hàm output
	def __str__(self):
		s1 = f"{self.num} {self.denom}"
		return s1
	
	# sumFraction
	def sumFraction(self, b):
		ans = Fraction()
		ans.num = self.num * b.denom + self.denom * b.num
		ans.denom = self.denom * b.denom
		ans.reduceFraction()
		return ans
	
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

# Input p1
x, y = map(int, input().split())
p1 = Fraction(x, y)

# Input p2
x, y = map(int, input().split())
p2 = Fraction(x, y)

p3 = p1.sumFraction(p2)

print(p1)
print(p2)
print(p3)