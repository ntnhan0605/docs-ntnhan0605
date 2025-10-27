"""
- Recursion case : 
	- divide array -> array.length = 1
  
- exit case : 
	- not array
  - len(array) == 1 -> array[0] % 2 == 0 return array[0] else return 0
"""

def sumOfEvent(array):
  if not array:
    return 0
  if len(array) == 1:
    return array[0] if array[0] % 2 == 0 else 0
  
  mid = len(array) // 2
  return sumOfEvent(array[mid:]) + sumOfEvent(array[:mid])


n = int(input())
array = list(map(int, input().split()))

print(sumOfEvent(array))
	