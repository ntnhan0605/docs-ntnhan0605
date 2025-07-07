number = input()
s = sum(int(n) for n in number)

print(s % 10)


# Another world -> Với input theo đề bài luôn luôn là số có 5 chữ số
# Lấy chữ số cuối cùng của x (x5) -> x % 10
# Lấy chữ số gần cuối của x (x4) -> (x // 10 ) % 10
# ...
# Lấy hết x1, x2, x3, x4, x5: (x1 + x2 + x3 + x4 + x5) % 10

# x = int(input())
# x5 = x % 10
# x //= 10
# x4 = x % 10
# x //= 10
# x3 = x % 10
# x //= 10
# x2 = x % 10
# x //= 10
# x1 = x % 10
# x //= 10

# print((x1 + x2 + x3 + x4 + x5) % 10)