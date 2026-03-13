class Point:
	def __init__(self):
		x, y

def distances (a, b):
	return

def bruteForces(left, right, points):
	result = INF
	for i in range(left, right):
		for j in range(i + 1, right):
			result = min(result, distances(points[i], points[j]))
	sort(points[left:right] by y)
	return result

def stripClosest(left, right, mid, midDist, points):
	# assume là từ left -> right đã tăng dần theo y, và từ mid + 1 -> right cũng tăng dần theo y
	sorted_by_y = mergeSort(points[left:mid], points[mid+1:right])  # O(N)
	strip = []
	for p in sorted_by_y:
		if abs(p.x - points[mid].x) <= midDist:
			strip.append(p)
	# no need too sort strip
	result = INF
	for i in range(len(strip) - 1):
		for j in range(i + 1, len(strip) - 1):
			if abs(strip[i].y - strip[j].y) >= minDist:
				break
			result = min(result, distances(strip[i], strip[j]))
	points[left:right] = sorted_by_y
	return result

def getClosestPoints (left, right, points):
	if (right - left) <= 3:
		return bruteForces(left, right, points)

	mid = (left + right) / 2

	distLeft = getClosestPoints(left, mid, points)
	distRight = getClosestPoints(mid+1, right, points)
	mindDist = min(distLeft, distRight)
	return min(minDist, stripClosest(left, right, mid, minDist, points))


while True:
	n = int(input())
	if n == 0:
		break
	for i in range(n):
		x, y = list(map(int, input().split()))
		points.add(Point(x, y))
		points.sort(lambda p: p.x )

		minDist = getClosestPoints(0, n-1, points)
		if minDist >= 10000:
			print('INFINITY')
		else:
			print(minDist)






"""
3
0 0
10000 10000
20000 20000
5
0 2
6 67
43 71
39 107
189 140
0
----
INFINITY
36.2215
"""
