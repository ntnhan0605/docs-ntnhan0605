"""
list colored ribbon

"""


class Ribbon:
	def __init__(self, code, len = 0, count = 1):
		self.code = code
		self.len = len
		self.count = count
	
	def __str__(self):
		return f"{self.code} {self.len} {self.count}"
	
	def lengthRibbon(self, rib):
		self.len += rib.len
		self.count += 1

class Ribbons:
	def __init__(self):
		self.ribbons = []

	def __str__(self):
		n = len(self.ribbons)
		s = f"{n}\n"
		for i in range(n):
			s += f"{self.ribbons[i]}\n"
		return s

	def findIndex(self, rib):
		if len(self.ribbons) == 0:
			return -1
		for i in range(len(self.ribbons)):
			if self.ribbons[i].code == rib.code:
				return i
		return -1
	
	def addRibbon(self, rib):
		index = self.findIndex(rib)
		if index == -1:
			self.ribbons.append(rib)
		else:
			self.ribbons[index].lengthRibbon(rib)
	
	def arrangeRibbon(self):
		for i in range(len(self.ribbons)):
			for j in range(i, len(self.ribbons)):
				if self.ribbons[i].code > self.ribbons[j].code:
					tmp = self.ribbons[i]
					self.ribbons[i] = self.ribbons[j]
					self.ribbons[j] = tmp
			


n = int(input())
ribs = Ribbons()
for i in range(n):
	code, length = map(int, input().split())
	rib = Ribbon(code, length)
	ribs.addRibbon(rib)
	
ribs.arrangeRibbon()
print(ribs)
