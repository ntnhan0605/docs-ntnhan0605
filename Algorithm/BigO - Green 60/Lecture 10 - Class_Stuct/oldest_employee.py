"""
Employee = {code, name, age}
Employees = Employee[]

findMaxAge():
	max = emp[0]
	for i in range(employees):
		if max < emps[i].age:
			max = emps[i].age
	return max

findOldest():
	arrMax = []
	max = findMaxAge()
	for i in range(employees):
		if max == employees[i].age:
			arrMax.append(employees[i])
	return []

"""

class Employee:
	def __init__(self, code, name, year):
		self.code = code
		self.name = name
		self.year = year

	def __str__(self):
		return f"{self.code} {self.name} {self.year}"

class Employees:
	def __init__(self):
		self.employees = []
	
	def addEmployee(self, employee):
		self.employees.append(employee)
	
	def findMaxAge(self):
		max = 9999999
		for i in range(len(self.employees)):
			if self.employees[i].year < max:
				max = self.employees[i].year
		return max
	
	def findOldestEmployee(self):
		maxAge = self.findMaxAge()
		minCode = 99999
		index = 0
		for i in range(len(self.employees)):
			if maxAge == self.employees[i].year:
				if minCode > int(self.employees[i].code):
					index = i
					minCode = int(self.employees[i].code)
		return self.employees[index]

n = int(input())
employees = Employees()
for i in range(n):
	code, name, year = input().split()
	employee = Employee(code, name, int(year))
	employees.addEmployee(employee)

print(employees.findOldestEmployee())