"Ước số lẻ lớn nhất (Biggest Odd Divisor) BOD"
"""
Nếu n là số lẻ thì Ước số lớn nhất mà nó chia hết là chính nó.
Nếu n là số chẵn thì chia tiếp cho 2 vì đang tìm số lẻ lớn nhất.
	Và chia đến khi nhận được số lẻ thì chính nó là số lẻ lớn nhất
- Recursion case : n // 2
- Base case : divider là số lẻ.
"""

def BOD(n):
	if n == 1 or n % 2 != 0:
		return n
	return BOD(n // 2)

n = int(input())
print(BOD(n))
	
