bitmap = [] * []
def inputBitMap(h, w):
	for i in range(h):
		for j in range(w):
			c = input()
			bitmap[i][j] = c

def countBit1(x, y, h, w):
	# đếm số lượng bit 1 trong ma trận có góc trái trên là (x, y) và kích thước h*w
	count = 0
	for i in range(x, x + h - 1):
		for j in range(y, y + w - 1):
			if bitmap[i][j] == '1':
				count += 1
	return count

def B2D(x, y, h, w):
	if h == 0 or w == 0:
		return ""
	count1 = countBit1(x, y, h, w)

	if count1 == 0:
		return "0"
	return "D" + B2D(x, y, (h + 1) / 2, (w + 1) /2) + B2D(x, y + (w + 1) / 2, (h + 1) / 2, w /2) + B2D(x + (h + 1) / 2, y, h / 2, (w + 1) /2)+ B2D(x + (h + 1) / 2, y + (w + 1) / 2, h / 2, w / 2)

def fill(dest, x, y, h, w, c):
	for i in range(x, x + h-1):
		for j in range(y, y + w - 1):
			dest[i][j] = c

def D2B(dest, x, y, h, w):
	if h == 0 or w == 0:
		return
	c = input()
	if c != "D":
		fill(dest, x, y, h, w, c)
	

def main():
	while True:
		A = input()
		if A == '#':
			break
		B = input()
		type, H, W = A.split()
		if type == 'B':
			print()
		else:
			print()

main()



"""
B 3 4
001000011011
D 2 3
DD10111
#
----
D 3 4
D0D1001D101
B 2 3
101111
"""