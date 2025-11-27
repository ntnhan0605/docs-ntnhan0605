"""
input
6
4 4
####
#...
#.##
#.##
5 5
#.###
#..##
##..#
#.#.#
###.#
1 1
.
5 1
#
#
.
.
#
2 2
#.
.#
3 4
#..#
#.##
#.##
output
valid
valid
invalid
valid
invalid
invalid

---
tests 1
####
#...
#.##
#.##
0 0 0 0
0 1 1 1
0 1 0 0
0 1 0 0
[ [1,1], [2,1], [3,1], [1,2], [1,3] ]
 1 -> 2
 |
 3
valid
---
test 2
#.###
#..##
##..#
#.#.#
###.#
0 1 0 0 0
0 1 1 0 0
0 0 1 1 0
0 1 0 1 0
0 0 0 1 0
[ [1,0], [1,1], [2,1], [2,2], [3,2], [1,3], [3,3], [3,4] ]
  1 -> 0
 / \
2 ->3 -> 4
valid
---
test 3
.
1
[ [0, 0] ]
invalid
---
test 3
#
#
.
.
#
0
0
1
1
0
[ [2,0], [3, 0] ]
0 -> 2
|
3
valid
---
#.
.#
0 1
1 0
[ [0,1], [1,0]]
0 <-> 1
invalid
---
#..#
#.##
#.##
0 1 1 0
0 1 0 0
0 1 0 0
[ [1,0], [2,0], [1,1], [1,2] ]
 0<->1
 | /
 2
invalid
---
"""
import queue

n = int(input())

def validate_the_maze(graph, m, n):
	q = queue.Queue()
	visited = [False] * m
	print(graph)
	for u in range(m):
		for v in graph[u]:
			if visited[v] == False:
				visited[v] = True
				q.put(v)

	# print('invalid')

for i in range(n):
	[m, n] = list(map(int, input().split()))
	graph = [[] for _ in range(m)]
	for i in range(m):
		row = input()
		for j in range(n):
			if row[j] == '.':
				graph[i].append(j)
	validate_the_maze(graph, m, n)

	
