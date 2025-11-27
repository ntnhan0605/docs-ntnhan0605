"""
input
saveChangesInTheEditor
output
5
"""
camelCase = input()

count = 1
for i in camelCase:
	if ord(i)<= ord('Z') and ord(i) >= ord('A'):
		count += 1
print(count)