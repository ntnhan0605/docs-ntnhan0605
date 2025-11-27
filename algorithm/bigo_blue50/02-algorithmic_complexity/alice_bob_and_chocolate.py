"""
input
5
2 9 8 2 7
output
2 3
"""

n = int(input())
time = list(map(int, input().split()))

def alice_bob_and_chocolate(time, n):
	totalTime = 0
	i = 0
	j = n - 1
	timeI = 0
	timeJ = 0
	while i <= j:
		if timeI <= timeJ:
			timeI += time[i]
			i += 1
		else:
			timeJ += time[j]
			j -= 1
	print(f'{i} {n - i}')

alice_bob_and_chocolate(time, n)