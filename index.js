/*

SIMPLE CIPHER
by Mohammad Alomar
14 April 2025 @ 7:08 PM

https://simplec.pages.dev
https://simplecipher.pages.dev
https://simple-cipher.pages.dev
https://moalomar.github.io/simple-cipher

https://github.com/moalomar/simple-cipher

semzopxAaQXDlvAQTcpzHCzARBwJbQpPBpZixQqzNEScAzLMpQACpQFnzadXAPZ

*/

function setRem() {

    let vh = Math.min(window.innerHeight, document.documentElement.clientHeight)
    let vw = Math.min(window.innerWidth, document.documentElement.clientWidth)

    let rem = Math.min(vh, vw * 16/9)
    document.documentElement.style.fontSize = (rem/100).toString().concat('px')

}

window.addEventListener("load", setRem)
window.addEventListener("resize", setRem)

/*

body {height 100rem; width: 56.25rem}       ==> responsive portrait screen
:root {font-size: min(calc(16vw/9), 1vh)}   ==> inaccurate measures

*/

const SELECT = document.querySelector('select')
const TEXTAREA = document.querySelector('textarea')
const P = document.querySelector('p')

function main() {

    let choice = SELECT.value
    let message = TEXTAREA.value
    let output

    if (choice == '1')
        output = encrypt(message)

    else if (choice == '2')
        output = decrypt(message)

    else
        output = encrypt(message, false)

    P.textContent = output

}

TEXTAREA.addEventListener('input', main)
SELECT.addEventListener('change', main)
SELECT.addEventListener('click', main) // funny to use when the substitution is not fixed

document.querySelector('h1').addEventListener('click', () => { window.open('https://github.com/moalomar/simple-cipher', '_blank') })