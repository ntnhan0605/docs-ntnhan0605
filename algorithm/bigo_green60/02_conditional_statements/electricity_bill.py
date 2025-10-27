import math

m1, m2 = map(float, input().split())

kwh = m2 - m1
bill = 0

bill50 = 1484
bill51_100 = 1533
bill101_200 = 1786
bill201_300 = 2242
bill301_400 = 2503
bill401 = 2587

if (kwh <= 50):
	bill = kwh * bill50
elif(kwh <= 100):
	bill = 50 * bill50 + (kwh - 50) * bill51_100
elif(kwh <= 200):
	bill = 50 * bill50 + 50 * bill51_100 + (kwh - 100) * bill101_200
elif(kwh <= 300):
	bill = 50 * bill50 + 50 * bill51_100 + 100 * bill101_200 + (kwh - 200) * bill201_300
elif(kwh <= 400):
	bill = 50 * bill50 + 50 * bill51_100 + 100 * bill101_200 + 100 * bill201_300 + (kwh - 300) * bill301_400
else:
	bill = 50 * bill50 + 50 * bill51_100 + 100 * bill101_200 + 100 * bill201_300 + 100 * bill301_400 + (kwh - 400) * bill401

print(math.floor(bill + bill * 0.1))
