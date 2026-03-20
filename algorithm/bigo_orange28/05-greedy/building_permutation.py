N = int(input())
a = list(map(int, input().split()))
a.sort()
print(a)

answer = 0
for i in range(N):
	answer += abs(a[i] - i)

print(answer)

"""
2
3 0
---
2

3
-1 -1 2
---
6
"""