"""

input n 
			arr [] {weight price}

output
	if multiple the same max weight -> choose the price highest
	else choose the max weight

"""

class Apple:
	def __init__(self, index, weight, price):
		self.index = index
		self.weight = weight
		self.price = price

	def __str__(self):
		return f"{self.index}"

class Apples:
	def __init__(self):
		self.apples = []

	def findMaxWeight(self):
		max = 0
		for apple in self.apples:
			if apple.weight > max:
				max = apple.weight
		return max

	def findAppleImak(self):
		maxWeight = self.findMaxWeight()
		maxPrice = 0
		index = 0
		for i in range(len(self.apples)):
			apple = self.apples[i]
			if apple.weight == maxWeight:
				if maxPrice < apple.price:
					maxPrice = apple.price
					index = i
		return self.apples[index]

	
n = int(input())
apples = Apples()
for i in range(n):
	weight, price = map(int, input().split())
	apple = Apple(i, weight, price)
	apples.apples.append(apple)

print(apples.findAppleImak())