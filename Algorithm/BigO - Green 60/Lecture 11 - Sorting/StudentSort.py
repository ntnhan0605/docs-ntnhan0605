class Student:
	def __init__(self, id, score):
		self.id = id
		self.score = score

	def compare(self, other):
		return (self.score > other.score) or (self.score == other.score and self.id < other.id)

def merge(L, n1, R, n2, a, n):
	i = j = k = 0
	while i < n1 and j < n2:
		if L[i].compare(R[j]):
			a[k] = L[i]
			i += 1
		else:
			a[k] = R[j]
			j += 1
		k += 1
	while i < n1:
		a[k] = L[i]
		i+=1
		k+=1
	while j < n2:
		a[k] = R[j]
		j+=1
		k+=1

def mergeSort(a, n):
	if n > 1:
		n1 = n // 2
		n2 = n - n1
		L = a[:n1]
		R = a[n1:]
		mergeSort(L, n1)
		mergeSort(R, n2)
		merge(L, n1, R, n2, a, n)

n, k = map(int, input().split())
stu = []
for i in range(n):
	line = input().split()
	id = int(line[0])
	score = float(line[1])
	stu.append(Student(id, score))

mergeSort(stu, n)
for i in range(k):
	print(stu[i].id)