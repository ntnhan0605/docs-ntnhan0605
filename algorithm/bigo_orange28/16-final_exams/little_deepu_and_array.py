"""
Little Deepu and Array
Little Deepu loves positive things in life, positive girlfriends, positive marks. He's, in general a lover of positive things, so for obvious reasons he loves an array which contains positive elements.

Anyway, Little Deepu also thinks that not every value in his so called positive array deserves to be valued so high, so he makes an operation called HIT which takes exactly one argument, i.e., HIT (X). When HIT (X) is called, it decreases the value of all the elements of the array by 1 which are greater than X.

Now, to test how positive can you stay in life, he performs M HIT operations, and after they have been done, Deepu wants you to print the final array.

Input Format
The first line contains a single integer T, denoting the number of test cases. The description of T test cases follows.
The first line of each test case contains two space-separated integers N and M.
The second line of each test case contains N space-separated integers A1, A2, ..., AN.

Output Format
For each test case, print the final array in a single line.

Constraints
1 ≤ N ≤ 1000000
1 ≤ M ≤ 1000000
1 ≤ Ai ≤ 1000000000
1 ≤ X ≤ 1000000000

5
7 8 3 2 10
4
1
3
5
7
----
5 5 2 1 7 
"""

def main():
	N = int(input())
	a = list(map(int, input().split()))
	M = int(input())
	for _ in range(M):
		X = int(input())
		max = []
		for i in range(N):
			if a[i] > X:
				a[i] -= 1
	print(*a)

main()