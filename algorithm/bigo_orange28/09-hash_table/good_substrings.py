def convert(ch):
	return ord(ch) - ord('a') + 1

s = input()
isGood = input()
isGood = " " + isGood

MOD = 1e9 + 7
BASE = 31 # polyHash
a = 5
b = 2 # JSHash
hashSet = dict()

for i in range(len(s) - 1):
	polyHash = 0
	count = 0
	jsHash = 1315423911
	for j in range(len(s) - 1):
		num = convert(s[j])
		polyHash = (polyHash * BASE + num) % MOD
		x = jsHash << a
		y = jsHash >> b
		jsHash = (jsHash ^ (x + num + y)) % MOD
		if isGood[num] == '0':
			count += 1
		if count > 2:
			break
		hashSet.add(polyHash, jsHash)

print(hashSet.__len__)


"""
ababab
01000000000000000000000000
1
----
5

acbacbacaa
00000000000000000000000000
2
----
8
"""