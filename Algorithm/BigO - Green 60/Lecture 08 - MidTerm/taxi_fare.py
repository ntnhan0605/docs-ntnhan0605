n = int(input())

bill1 = 15000
bill2_5 = 13500
bill6 = 11000

taxi = 0
if n <= 1:
	taxi = bill1
elif 1 < n and n <= 5:
	taxi = bill1 + (n - 1) * bill2_5
elif n > 5:
	taxi = bill1 + 4 * bill2_5 + (n - 5) * bill6

if (n >= 12):
	taxi = taxi * 90 // 100

print(taxi)

