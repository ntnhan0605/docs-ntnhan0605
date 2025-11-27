"""
RPN (Ký pháp Ba Lan)
input
3
(a+(b*c))
((a+b)*(z+x))
((a+t)*((b+(a+c))^(c+d)))
output
abc*+
ab+zx+*
at+bac++cd+^*
"""
n = int(input())
rpn = []
for i in range(n):
	rpn.append(input())

def in_operator(s):
	return s in ['+', '-', '*', '/', '^']
		

def transform_the_expression(str):
	rpn = ''
	stack = []
	for i in str:
		if i == ')':
			rpn += stack.pop()
		elif in_operator(i):
			stack.append(i)
		elif i == '(':
			continue
		else:
			rpn += i
	return rpn

for i in range(n):
	print(transform_the_expression(rpn[i]))

		