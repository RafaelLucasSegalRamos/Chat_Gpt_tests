frase = 'racecar'
frasei = list()
frases = list()


# s == s[::-1] ou pode ser assim tbm


for c in range(len(frase)-1, -1, -1):
    frasei.append(frase[c])

for t in range(0, len(frase)):
    frases.append(frase[t])

if frasei == frases:
    print('This phrase is a palindrome')
else:
    print('this phrase is not a palindrome')
