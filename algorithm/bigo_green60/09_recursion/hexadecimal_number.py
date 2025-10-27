"""

Convert Dec -> Bin
n = 20 / 2 = 10 -> m = 0
n = 10 / 2 = 5 -> m = 0
n = 5 / 2 = 2	-> m = 1
n = 2 / 2 = 1	-> m = 0
n = 1 / 2 = 0 -> m = 1
Result -> 0 1 0 0

Convert Dec -> Hex  0 - 9 : origin 10 11 12 13 14 15 (A B C D E F)
Module : 0 --> 15

"""

HEX = "0123456789ABCDEF"
def DecToHex(n, nx):
	if n == 0:
		return ""
	return DecToHex(n // 16, nx) + HEX[n % 16]

n = int(input())
if n == 0:
	print('0')
else:
	print(DecToHex(n, ""))
	