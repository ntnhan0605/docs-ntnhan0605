def main():
	ans = total = leakCount = lastPivot = n = 0
	while True:
		pivot = input()
		event = input()
		total += (n / 100 + leakCount) * (pivot - lastPivot)
		ans = max(ans, total)
		if event == "Fuel":
			# read(n)
			if n == 0 :
				exit()
		elif event == "Leak":
			leakCount += 1
		elif event == "Gas":
			# read(text)
			total = 0
		elif event == "Mechanic":
			leakCount = 0
		elif event == "Goal":
			print(ans, "\n") # lam tron 3 chu so thap phan
			ans = total = leakCount = lastPivot = n = 0

main()			


"""
0 Fuel consumption 10
100 Goal
0 Fuel consumption 5
100 Fuel consumption 30
200 Goal
0 Fuel consumption 20
10 Leak
25 Leak
25 Fuel consumption 30
50 Gas station
70 Mechanic
100 Leak
120 Goal
0 Fuel consumption 0
----
10.000
35.000
81.000
"""