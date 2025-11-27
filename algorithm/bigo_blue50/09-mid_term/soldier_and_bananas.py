"""
input
3 17 4
output
13
"""
[k, w, n] = list(map(int, input().split()))

total = ((n * (n + 1)) / 2) * k
print(int(total - w) if total > w else 0)