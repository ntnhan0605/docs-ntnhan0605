"""
Mancunian and K-Ordered LCS
Any programmer worth his salt would be familiar with the famous Longest Common Subsequence problem. Mancunian was asked to solve the same by an incompetent programmer. As expected, he solved it in a flash. To complicate matters, a twist was introduced in the problem.

In addition to the two sequences, an additional parameter k was introduced. A k-ordered LCS is defined to be the LCS of two sequences if you are allowed to change at most k elements in the first sequence to any value you wish to. Can you help Mancunian solve this version of the classical problem?

5 5 1
1 2 3 4 5
5 3 1 4 2
----
3

You can change the first element of the first sequence to 5 to get the LCS comprising of the sequence (5, 3, 4).
"""



def main():
    n, m, k_limit = map(int, input().split())
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))

    dp = [[[0] * (m + 1) for _ in range(n + 1)] for _ in range(k_limit + 1)]

    for k in range(k_limit + 1):
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                res = max(dp[k][i-1][j], dp[k][i][j-1])
                if a[i-1] == b[j-1]:
                    res = max(res, dp[k][i-1][j-1] + 1)
                elif k > 0:
                    res = max(res, dp[k-1][i-1][j-1] + 1)
                dp[k][i][j] = res

    print(dp[k_limit][n][m])

main()
