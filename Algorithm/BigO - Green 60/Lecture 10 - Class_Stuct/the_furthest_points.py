class Point:
	def __init__(self,x = 0, y = 0):
		self.x = x
		self.y = y

	def __str__(self):
		return f"{self.x} {self.y}"

	def distance(self, p2):
		return ((self.x - p2.x)**2 + (self.y - p2.y)**2) ** 0.5
	
	def max_point(self, arr):
		max = Point()
		maxDistance = 0
		for i in range(len(arr)):
			distance = self.distance(arr[i])
			if maxDistance < distance:
				max = arr[i]
				maxDistance = distance
		return max
	
x, y = map(int, input().split())
M = Point(x, y)

n = int(input())
arr = []
for i in range(n):
	x, y = map(int, input().split())
	arr.append(Point(x, y))

print(M.max_point(arr))



