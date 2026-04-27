"""
Trainsorting
Erin is an engineer. She drives trains. She also arranges the cars within each train. She prefers to put the cars in decreasing order of weight, with the heaviest car at the front of the train.

Unfortunately, sorting train cars is not easy. One cannot simply pick up a car and place it somewhere else. It is impractical to insert a car within an existing train. A car may only be added to the beginning and end of the train.

Cars arrive at the train station in a predetermined order. When each car arrives, Erin can add it to the beginning or end of her train, or refuse to add it at all. The resulting train should be as long as possible, but the cars within it must be ordered by weight.

Given the weights of the cars in the order in which they arrive, what is the longest train that Erin can make?

1
3
1
2
3
----
3
"""

def main():
	data = input().split()
	if not data:
		return
	T = int(data[0])
	idx = 1
	for _ in range(T):
		N = int(data[idx])
		idx += 1
		a = [int(data[idx + i]) for i in range(N)]
		idx += N
		
		lis = [1] * N
		lds = [1] * N
		for i in range(N - 1, -1, -1):
			for j in range(i + 1, N):
				if a[i] < a[j]:
					lis[i] = max(lis[i], 1 + lis[j])
				if a[i] > a[j]:
					lds[i] = max(lds[i], 1 + lds[j])
		ans = max((lis[i] + lds[i] - 1) for i in range(N)) if N > 0 else 0
		print(ans)

main()