# While loop
def BinarySearchWhile(a, x):
	left = 0
	right = len(a) - 1
	while left <= right:
		mid = (left + right) // 2
		if a[mid] == x:
			return mid
		elif a[mid] > x:
			right = mid - 1
		else:
			left = mid + 1
	return -1


# Recursive
def BinarySearchRecursive(a, left, right, x):
	if left <= right:
		mid = (left + right) // 2
		# mid = left + (right - left) / 2 # chỉ nên dành cho các ngôn ngữ strong type như C, C++, Java
		if a[mid] == x:
			return mid
		if a[mid] > x:
			return BinarySearchRecursive(a, left, mid - 1, x)
		return BinarySearchRecursive(a, mid + 1, right, x)
	return -1

# Binary Search First While
def BinarySearchFirstWhile(a, x):
	left = 0
	right = len(a) - 1
	while left <= right:
		mid = left + (right - left) // 2
		if (mid == left or x != a[mid - 1]) and a[mid] == x:
			return mid
		elif x > a[mid]:
			left = mid + 1
		else:
			right = mid - 1
	return -1

# Binary Search First Recursive
def BinarySearchFirst(a, left, right, x):
	if left <= right:
		mid = left + (right - left) // 2
		if (mid == left or x != a[mid - 1]) and a[mid] == x:
			return mid
		elif x > a[mid]:
			return BinarySearchFirst(a, mid + 1, right, x)
		else:
			return BinarySearchFirst(a, left, mid - 1, x)
	return -1


# Binary Search Last While
def BinarySearchLastWhile(a, x):
	left = 0
	right = len(a)
	while left <= right:
		mid = (left + right) // 2
		if (mid == right or x != a[mid + 1]) and a[mid] == x:
			return mid
		elif x > a[mid]:
			left = mid + 1
		else:
			right = mid - 1
	return -1

# Binary Search Last Recursive
def BinarySearchLast(a, left, right, x):
	if left <= right:
		mid = (left + right) // 2
		if (mid == right or x != a[mid + 1]) and a[mid] == x:
			return mid
		elif x < a[mid]:
			return BinarySearchLast(a, left, mid - 1, x)
		else:
			return BinarySearchLast(a, mid + 1, right, x)
	return -1


	