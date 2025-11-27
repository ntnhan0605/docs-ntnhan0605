"""
input
5
5 1 2 4 3
5
4 1 5 2 3
0
output
yes

20
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
20
20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
20
1 2 3 4 5 6 7 8 9 10 20 19 18 17 16 15 14 13 12 11
20
10 9 8 7 6 5 4 3 2 1 11 12 13 14 15 16 17 18 19 20
0
"""
# while True:
# 	n = int(input())
# 	if n == 0:
# 		break
# 	trucks = list(map(int, input().split()))
# 	side_trucks = []
# 	order = 1
# 	i = 0

# 	while i < n:
# 		if trucks[i] == order:
# 			order += 1
# 			i += 1
# 		elif side_trucks and side_trucks[-1] == order:
# 			order += 1
# 			side_trucks.pop()
# 		else:
# 			side_trucks.append(trucks[i])
# 			i += 1
# 	while side_trucks and side_trucks[-1] == order:
# 		order += 1
# 		side_trucks.pop()
# 	print('yes' if order == n + 1 else 'no')

import queue
side_trucks = queue.LifoQueue()
while True:
	n = int(input())
	if n == 0:
		break;
	trucks = list(map(int, input().split()))
	order = 1
	i = 0
	while i < n:
		if trucks[i] == order:
			order += 1
			i += 1
		elif not side_trucks.empty() and side_trucks.queue[-1] == order:
			order += 1
			side_trucks.get()
		else:
			side_trucks.put(trucks[i])
			i+= 1
	while not side_trucks.empty() and side_trucks.queue[-1] == order:
		order += 1
		side_trucks.get()
	print('yes' if order == n + 1 else "no")




