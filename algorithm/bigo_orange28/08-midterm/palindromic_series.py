MAP_STR = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

def isPalindromeNumber(num):
	nums = list(map(int, str(num)))
	string_length = 0
	sub_strings = ''
	for num in nums:
		string_length += num
	for i in range(string_length):
		sub_strings += MAP_STR[nums[i % len(nums)]]
	return sub_strings == sub_strings[::-1]

T = int(input())
for _ in range(T):
	N = int(input())
	if isPalindromeNumber(N):
		print("YES")
	else:
		print("NO")


"""
4
61
10101
1998
1234567
----
YES
YES
NO
NO
"""