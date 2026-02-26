"""
H = 1 , C = 12 , O = 16

"""

from queue import LifoQueue

mass = {"H": 1, "C": 12, "O": 16}

# atom = []
atom = LifoQueue()
chem = input().strip()

for c in chem:
    if c.isalpha():
        # atom.append(mass.get(c))
        atom.put(mass.get(c))
    elif c.isnumeric():
        # mol = atom[-1] * int(c)
        # atom.pop()
        # atom.append(mol)
        mol = atom.get() * int(c)
        atom.put(mol)
    elif c == "(":
        # atom.append(-1)
        atom.put(-1)
    elif c == ")":
        # w = 0
        # while atom[-1] != -1:
        # 	w += atom[-1]
        # 	atom.pop()
        # atom.pop()
        # atom.append(w)
        w = 0
        val = atom.get()
        while val != -1:
            w += val
            val = atom.get()
        atom.put(w)

total = 0
while not atom.empty():
    total += atom.get()
print(total)
