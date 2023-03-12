l = []
lp = []
i = 0

for c in range(0, 10):
    l.append(c)

for pos, c in enumerate(l):
    if l[c] % 2 == 0:
        lp.append(l[c])

print(lp)
