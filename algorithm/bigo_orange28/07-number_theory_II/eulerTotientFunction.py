"""
Euler's totien function (Hàm phi Euler)
Hàm phi Euler của một số nguyên dương N là số lượng số 
nguyên dương không quá N và nguyên tố cùng nhau với N.
Relatively prime (Số nguyên tố cùng nhau): hai số được gọi
là nguyên tố cùng nhau nếu chúng có 
ước số chung lớn nhất là 1.
Mở rộng: nếu chúng ta có n số nguyên cùng có GCD là 1 thì
n số đó cũng là nguyên tố cùng nhau.
Ý nghĩa cơ bản: Duyệt qua toàn bộ các số từ 1 đến N, 
đếm các số có GCD bằng 1.
Các tính nhất hàm phi Euler:
1. Nếu p là số nguyên tố: 
	phiEuler(p) = p - 1
2. Nếu p là số nguyên tố và k >= 1: 
	phiEuler(p^k) = p^k - p^(k-1)
3. Nếu a và b là nguyên tố cùng nhau: 
	phiEuler(a * b) = phiEuler(a) * phiEuler(b)
=> DỰA VÀO CÁC TÍNH CHẤT CỦA HÀM PHI EULER 
ĐỂ TÌM CÁCH GIẢM ĐỘ PHỨC TẠP.

Prime factorization (Phân tích thừa số nguyên tố): 
Phân tích một số ra thừa số nguyên tó là phân tích số đó
thành tích của các số nguyên tố
"""

def gcd(a, b):
	remainder = 0
	while b != 0:
		remainder = a % b
		a = b
		b = remainder
	return a

# O(NlogN)
def eulerPhi(n):
	result = 1
	for i in range(2, n):
		if gcd(i, n) == 1:
			print(i, end = ' ')
			result += 1
	print()
	return result

# O(sqrl(N))
def phi(n):
	result = n
	for i in range(2, int(n ** 0.5) + 1):
		if n % i == 0:
			while n % i == 0:
				n /= i
			result = result / i * (i - 1)
	if n > 1:
		result = result / n * (n - 1)
	return int(result)

def main():
	n = 60
	print(eulerPhi(n))
	print(phi(n))
	# print(eulerPhi(6))
	# print(eulerPhi(5))

main()