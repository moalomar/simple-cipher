"""

SIMPLE CIPHER
by Mohammad Alomar
14 April 2025 @ 7:08 PM

https://simplec.pages.dev
https://simplecipher.pages.dev
https://simple-cipher.pages.dev
https://moalomar.github.io/simple-cipher

https://github.com/moalomar/simple-cipher

weVpWzbQqAmilNzpGxQAtnpQuBLfcAzaCQPEXzZAMkovppsxAQzbpQjnzZKMAaP

"""

import copy, random

ENCRYPTION_MAP = {

    '1': ['Q', 'A', 'p', 'z'],
    '2': ['W', 'S', 'o', 'l'],
    '3': ['E', 'D', 'i', 'k'],
    '4': ['R', 'F', 'u', 'j'],
    '5': ['T', 'G', 'y', 'h'],
    '6': ['Y', 'H', 't', 'g'],
    '7': ['U', 'J', 'r', 'f'],
    '8': ['I', 'K', 'e', 'd'],
    '9': ['O', 'L', 'w', 's'],
    '0': ['P', 'Z', 'q', 'a'],
    '-': ['B', 'C', 'V', 'X', 'N', 'M', 'b', 'c', 'v', 'x', 'n', 'm']

}

encryption_map = copy.deepcopy(ENCRYPTION_MAP)

decryption_map = {}
for key in ENCRYPTION_MAP:
    for value in ENCRYPTION_MAP[key]:
        decryption_map[value] = key

def random_substitute(char):

    substitutes = encryption_map[char]
    random_index = random.randrange(len(substitutes))
    encrypted_char = substitutes.pop(random_index)
    
    if len(substitutes) == 0:
        encryption_map[char] = ENCRYPTION_MAP[char].copy()
    
    return encrypted_char

def encrypt(string, fixed_substitution=True):

    encrypted_string = []

    for i, char in enumerate(string):

        ascii_code = ord(char)
        ascii_code = str(ascii_code)
        is_the_last_char = i == len(string) - 1

        for digit in ascii_code:
            encrypted_digit = ENCRYPTION_MAP[digit][0] if fixed_substitution else random_substitute(digit)
            encrypted_string.append(encrypted_digit)

        if not is_the_last_char:
            encrypted_separator = ENCRYPTION_MAP['-'][0] if fixed_substitution else random_substitute('-')
            encrypted_string.append(encrypted_separator)

    encrypted_string = ''.join(encrypted_string)
    return encrypted_string

def decrypt(string):

    decrypted_string = []
    decrypted_ascii_code = []

    for i, char in enumerate(string):

        decrypted_char = decryption_map[char]
        decrypted_char_is_separator = decrypted_char == '-'
        decrypted_char_is_digit = not decrypted_char_is_separator
        is_the_last_char = i == len(string) - 1

        if decrypted_char_is_digit:
            decrypted_ascii_code.append(decrypted_char)

        if decrypted_char_is_separator or is_the_last_char:
            decrypted_ascii_code = ''.join(decrypted_ascii_code)
            decrypted_ascii_code = int(decrypted_ascii_code)
            decrypted_symbol = chr(decrypted_ascii_code)
            decrypted_string.append(decrypted_symbol)
            decrypted_ascii_code = []

    decrypted_string = ''.join(decrypted_string)
    return decrypted_string

if __name__ == '__main__':

    print()
    print('    SIMPLE CIPHER')
    print()
    print('[1] ENCRYPT')
    print('[2] DECRYPT')
    print('[3] SPECIAL')

    while True:

        print()
        choice = input('CHOICE? ')

        if choice not in ('1', '2', '3'):
            print('BYE')
            print()
            break

        message = input('MESSAGE? ')

        if choice == '1':
            output = encrypt(message)

        elif choice == '2':
            output = decrypt(message)

        else:
            output = encrypt(message, False)

        print(output)

"""

fun fact:
if the substitution is always fixed, then we could simply...

m = ['P', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O']

def encrypt(s):
    return 'B'.join([''.join([m[int(d)] for d in str(ord(c))]) for c in s])

def decrypt(s):
    return ''.join([chr(int(''.join([str(m.index(c)) for c in a]))) for a in s.split('B')])

"""