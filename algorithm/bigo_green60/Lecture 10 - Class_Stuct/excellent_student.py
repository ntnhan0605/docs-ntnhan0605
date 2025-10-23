class Student:
	def __init__(self, name, math, literature):
		self.name = name
		self.math = math
		self.literature = literature
	
	def __str__(self):
		return f"{self.name} : {self.math}, {self.literature}"
	
	def average_scores(self):
		return (self.math + self.literature) / 2
	
class Classmate:
	def __init__(self, arr = []):
		self.students = arr
	
	def add_student(self, student):
		self.students.append(student)

	def count_over_9_score(self):
		if len(self.students) == 0:
			return 0
		count90 = 0
		for i in range(len(self.students)):
			avgStu = self.students[i].average_scores()
			if avgStu >= 9:
				count90+= 1
		return count90
	
n = int(input())

classmate = Classmate()
for i in range(n):
	name = input()
	math, literature = map(float, input().split())
	classmate.add_student(Student(name, math, literature))

print(classmate.count_over_9_score())

