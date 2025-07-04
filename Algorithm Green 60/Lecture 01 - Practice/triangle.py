a, b, c = map(float, input().split())

P = a + b + c
p = P / 2
S = (p * (p - a) * (p - b) * (p - c)) ** 0.5
print(f"{P:.2f} {S:.2f}")