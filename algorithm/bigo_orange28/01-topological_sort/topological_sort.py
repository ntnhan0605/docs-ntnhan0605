"""
8 9
1 4
1 2
4 2
4 3
3 2
5 2
3 5
8 2
8 6

1 4 3 5 7 8 2 6
"""

"""
2 2
1 2
2 1

Sandro fails.
"""


import queue


def topologicalSortingKahn(graph, result, V):
    indegree = [0] * V
    zero_indegree = queue.PriorityQueue()
    for u in range(V):
        for v in graph[u]:
            indegree[v] += 1
    for i in range(V):
        if indegree[i] == 0:
            zero_indegree.put(i)
    while not zero_indegree.empty():
        u = zero_indegree.get()
        result.append(u)
        for v in graph[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                zero_indegree.put(v)
    return len(result) == V


V, E = map(int, input().split())
V += 1
graph = [[] for i in range(V)]
result = []
indegree = [0] * V

for i in range(E):
    u, v = map(int, input().split())
    graph[u].append(v)
if topologicalSortingKahn(graph, result, V):
    for i in range(1, V):
        print(result[i], end=" ")
    print("\n")
else:
    print("Sandro fails.")
