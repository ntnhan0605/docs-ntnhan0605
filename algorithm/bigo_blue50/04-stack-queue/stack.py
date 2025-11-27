import queue

stack = []

stack.append(1)
print(stack)
last1 = stack.pop()
print(stack, last1)
stack.append(2)
print(stack)
last2 = stack[-1]
print(stack, last2)

lifoQueue = queue.LifoQueue()
lifoQueue.put(1)
lifoQueue.put(2)
lifoQueue.put(3)
lifoQueue.put(4)

print('Stack 1:',lifoQueue.queue)
print(lifoQueue.get())
print('Stack 2:',lifoQueue.queue)

q = queue.Queue()
q.put(4)
q.put(3)
q.put(2)
q.put(1)
print('Queue 1:', q.queue)
print(q.get())
print('Queue 3', q.queue)