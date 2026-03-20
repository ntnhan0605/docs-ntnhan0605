"""
Sieve of Eratosthenes (Sàng nguyên tố Eratosthenes):
Là thuật toán dùng để tìm ra tất cả các số nguyên tố
nhỏ hơn hoặc bằng số N cho trước.
Ý tưởng: 
- Sàng Eratosthenes dựa vào tính chất của thừa số nguyên tố.
- Nếu 1 số là số nguyên tố thì đánh dấu lại tất cả các bội số của nó vì 
chắc chắn những số này không phải là số nguyên tố.
- Tiếp tục quay lại tìm trong danh sách những số nào 
chưa bị đánh dấu và thực hiện lại như bước trên. 
- Nếu không còn số nào thì dừng.
Độ phức tạp: O(Nlog(logN))
"""

def sieveOfEratosthenes(n):
	mark = [True] * (n + 1)
	primes = []
	mark[0] = mark[1] = False
	for i in range(2, int(n ** 0.5) + 1):
		if mark[i] == True:
			for j in range(i * i, n + 1, i):
				mark[j] = False
	for i in range(2, n + 1):
		if mark[i] == True:
			primes.append(i)
	return primes

print(sieveOfEratosthenes(18))