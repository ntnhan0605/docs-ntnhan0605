"""
- class Student {code, math, literature}
- arrStudent = [] arrSearch = []
	for i in range(n + q)
	if i <= n - 1 thi
		- Thêm vào arrStudent với item = Student(code, math, literature)
	else thì
		- Thêm vào arrSearch
	
- class 
	for i in range(q):
		print(arrStudent[arrSearch[i]])
"""

class Student:
	def __init__(self, code = 0, math = 0, literature = 0):
		self.code = code 
		self.math = math
		self.literature = literature

	def __str__(self):
		return f"{self.math} {self.literature}"
	
class StudentClass:
	def __init__(self):
		self.students = []

	def addStudent(self, student):
		self.students.append(student)

	def findItem(self, code):
		for i in range(len(self.students)):
			if code == self.students[i].code:
				return self.students[i]
	
	def search(self, arrSearch = []):
		if len(arrSearch) == 0:
			return
		for code in arrSearch:
			itemSearch = self.findItem(code)
			print(itemSearch)
			

n, q = map(int, input().split())	

stuClass = StudentClass()
arrSearch = []
for i in range(n + q):
	if i < n:
		code, math, literature = input().split()
		stuClass.addStudent(Student(int(code), float(math), float(literature)))
	else:
		code = int(input())
		arrSearch.append(int(code))

stuClass.search(arrSearch)


