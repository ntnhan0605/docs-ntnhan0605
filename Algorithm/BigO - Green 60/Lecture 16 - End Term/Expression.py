"""
2
10
3

=> 60


1
2
3

=> 9
"""

def expressionNumber(a, b, c):
	arr = []
	arr.append(a + b + c)
	arr.append(a + b * c)
	arr.append((a + b) * c)
	arr.append(a * b + c)
	arr.append(a * (b + c))
	arr.append(a * b * c)
	ans = 0
	for i in range(len(arr)):
		if arr[i] > ans:
			ans = arr[i]
	return ans

a = int(input())
b = int(input())
c = int(input())

print(expressionNumber(a, b, c))