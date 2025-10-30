"""
input
4 5
3 1 2 1
output
3

input
3 3
2 2 3
output
1

input
70 200
2 5 6 25 22 21 7 9 7 22 25 25 22 24 27 26 12 22 28 27 27 9 8 1 29 6 20 18 28 16 20 23 23 9 1 10 15 18 21 30 7 18 4 28 6 5 21 10 22 5 21 27 17 4 21 4 25 4 5 30 21 5 21 12 25 1 2 23 26 22
output
15
"""
[n, t] = list(map(int, input().split()))
books = list(map(int, input().split()))

def max_books_can_read(arr, n, t):
	max_books = 0
	time = 0
	start = 0
	for end in range(n):
		time += arr[end]
		while time > t:
			time -= arr[start]
			start += 1
		max_books = max(end - start + 1, max_books)
	return max_books

print(str(max_books_can_read(books, n, t)))
