"""
input
0 0 0 0 -2 1
1 0 0 0 -1 2
1 -1 1 -1 -1 1
output
0.7071
No solution
0.7554
"""

"""

f'(x) = -q.e^-x + q.cosx - r.sinx + s / cosx^2 + 2xt

"""
import math



while True:
	(p, q, r, s, t, u) = list(map(int, input().split()))
	
	def f(x):
		return p * math.exp(-x) + q * math.sin(x) + r * math.cos(x) + s * math.tan(x) + t * x * x + u
	
	if f(0) < 0 or f(1) > 0:
		print('No solution')
	else:
		left = 0
		right = 1
		__esp = 1e-6
		while right -left > __esp:
			x = (right + left) // 2
			if f(x) > 0:
				left = x
			else:
				right = x
		print(f'{left}:.4')
