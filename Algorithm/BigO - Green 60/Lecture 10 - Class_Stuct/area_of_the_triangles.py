"""
Class point 
	- distance to next point

Class Triangle:
	- 
"""

class Point2D:
	def __init__(self,x = 0, y = 0):
		self.x = x
		self.y = y

	def __str__(self):
		return f"{self.x} {self.y}"
	
	def distance(self, p):
		return ((self.x - p.x) ** 2 + (self.y - p.y) ** 2) ** 0.5

class Triangles:
	def __init__(self, A, B, C):
		self.A = A
		self.B = B
		self.C = C
		self.a = A.distance(B)
		self.b = B.distance(C)
		self.c = C.distance(A)

	def perimeter(self):
		return self.a + self.b + self.c

	def area(self):
		s = self.perimeter() / 2
		a = self.a
		b = self.b
		c = self.c
		return (s * (s - a) * (s - b) * (s - c)) ** 0.5


n = int(input())
s = 0
for i in range(n):
	ax, ay = map(int, input().split())
	bx, by = map(int, input().split())
	cx, cy = map(int, input().split())
	ai = Triangles(Point2D(ax, ay), Point2D(bx, by), Point2D(cx, cy))
	s += ai.area()

print(f"{s:.2f}")
