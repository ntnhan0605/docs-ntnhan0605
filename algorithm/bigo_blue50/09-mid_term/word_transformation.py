"""
input
1

dip
lip
mad
map
maple
may
pad
pip
pod
pop
sap
sip
slice
slick
spice
stick
stock
*
spice stock
may pod
output
spice stock 4
may pod 3
"""


tc = int(input())
for _ in range(tc):
	arr = []
	while True:
		txt = input()
		if txt == '*': break
		if txt == '': continue
		arr.append(txt)
	def dictionary(s):
		return s[1]
	sorted(arr, key=dictionary)
	print(arr)
	while True:
		txt = input()
		if txt == '':
			break
		