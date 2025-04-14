/*

SIMPLE CIPHER
by Mohammad Alomar
14 April 2025 @ 7:08 PM

https://simplec.pages.dev
https://simplecipher.pages.dev
https://simple-cipher.pages.dev
https://moalomar.github.io/simple-cipher

https://github.com/moalomar/simple-cipher

seCzlQxAPpVEWcAQhBzpYMpAuXLrNQzZvAaDmzqpniSbQQOcpAzbApRBQPdvzaq

*/

const ENCRYPTION_MAP = {

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

let encryptionMap = structuredClone(ENCRYPTION_MAP)

let decryptionMap = {}
for (let key in ENCRYPTION_MAP)
    for (let value of ENCRYPTION_MAP[key])
        decryptionMap[value] = key

function randomSubstitute(char) {

    let substitutes = encryptionMap[char]
    let randomIndex = Math.floor(Math.random() * substitutes.length)
    let encryptedChar = substitutes.splice(randomIndex, 1).pop()

    if (substitutes.length == 0)
        encryptionMap[char] = ENCRYPTION_MAP[char].slice()

    return encryptedChar

}

function encrypt(string, fixedSubstitution = true) {

    let encryptedString = []

    for (let i in string) {

        let asciiCode = string.charCodeAt(i)
        asciiCode = String(asciiCode)
        let isTheLastChar = i == string.length - 1

        for (digit of asciiCode) {
            let encryptedDigit = fixedSubstitution ? ENCRYPTION_MAP[digit][0] : randomSubstitute(digit)
            encryptedString.push(encryptedDigit)
        }

        if (!isTheLastChar) {
            let encryptedSeparator = fixedSubstitution ? ENCRYPTION_MAP['-'][0] : randomSubstitute('-')
            encryptedString.push(encryptedSeparator)
        }

    }

    encryptedString = encryptedString.join('')
    return encryptedString

}

function decrypt(string) {

    let decryptedString = []
    let decryptedAsciiCode = []

    for (let i in string) {

        let char = string[i]
        let decryptedChar = decryptionMap[char]
        let decryptedCharIsSeparator = decryptedChar == '-'
        let decryptedCharIsDigit = !decryptedCharIsSeparator
        let isTheLastChar = i == string.length - 1

        if (decryptedCharIsDigit)
            decryptedAsciiCode.push(decryptedChar)

        if (decryptedCharIsSeparator || isTheLastChar) {
            decryptedAsciiCode = decryptedAsciiCode.join('')
            decryptedAsciiCode = parseInt(decryptedAsciiCode)
            let decryptedSymbol = String.fromCharCode(decryptedAsciiCode)
            decryptedString.push(decryptedSymbol)
            decryptedAsciiCode = []
        }

    }

    decryptedString = decryptedString.join('')
    return decryptedString

}

/*

fun fact:
if the substitution is always fixed, then we could simply...

let m = ['P', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O']
let encrypt = s => [...s].map(c => [...c.charCodeAt(0) + ''].map(d => m[parseInt(d)]).join('')).join('B')
let decrypt = s => s.split('B').map(a => String.fromCharCode(parseInt([...a].map(c => m.indexOf(c) + '').join('')))).join('')

*/