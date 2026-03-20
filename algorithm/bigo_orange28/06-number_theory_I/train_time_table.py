class Trip:
	def __init__(self, start, end,side):
		self.start = start
		self.end = end
		self.side = side
		
def convert(s):
	return



def main():
	c = int(input())
	for i in range(c):
		T = int(input())
		NA, NB = list(map(int, input().split()))
		trips = []

		for i in range(NA):
			start, end = input()
			trips.add(Trip(start,end, 0))
	
		for i in range (NB):
			start, end = input()
			trips.add(Trip(start, end, 1))
		
		# sort(Trips)

		minHeap = minHeap[2]
		count = [0, 0]
		for (start, end, side) in trips:
			if minHeap[side].empty() or minHeap[side].minValue > start:
				# Không có đoàn tàu nào sẵn sàng
				# Chưa có đoàn tàu nào sẵn sàng
				count[side] += 1
			else:
				minHeap[side].popMinValue()
				otherSide = 1 - side = 1 ^ side
				minHeap[otherSide].add(end + T)
		print("Case #{tc}: {cound[0]} {count[1]}")

		


"""
2
5
3 2
09:00 12:00
10:00 13:00
11:00 12:30
12:02 15:00
09:00 10:30
2
2 0
09:00 09:01
12:00 12:02
-----
Case #1: 2 2
Case #2: 2 0
"""