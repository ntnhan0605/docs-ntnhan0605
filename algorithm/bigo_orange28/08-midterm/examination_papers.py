mod = 1_000_000_007

T = int(input())
for _ in range(T):		
	n = int(input())
	moves = (pow(2, n, mod) - 1) % mod
	print(moves)


"""
Examination Papers
A professor teaches Computer Science in his University. After the End Semester Examination, he checks all the papers and keeps them in descending order based on marks in the form of a pile. However he realizes that he has kept the papers in the box meant for Chemistry papers. He has to transfer the papers to the actual box that too in a pile with descending order of marks, and with some conditions.

He can withdraw a paper from the top of a pile only, and also he can place a paper on the top of a pile only.
He can keep a paper only at three places: box meant for computer science paper, box meant for chemistry paper, and he can keep the papers on the table also while withdrawing another paper from the top of a pile.
He can't keep the papers upon the table separately, i.e, he has to keep those papers in a single pile upon the table.
A paper with lower marks never comes below the paper with higher marks in a pile.
Displacing a paper to any pile would be called a move.

He wants to know in advance how many moves would he require. Compute the number of moves.

The result can be large, take the mod by 1_000_000_007.

3
2 
4 
6
----
3
15
63
"""