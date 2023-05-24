//query selectors for currentOperationScreen, lastOperationScreen, buttons;
const lastOpScreen = document.querySelector('.lastOperationScreen');
const currentOpScreen = document.querySelector('.currentOperationScreen');
const buttons = document.querySelectorAll('button');
const operatorBtns = document.querySelectorAll('.operation');
//addition, subtraction, multiplication, division 


if (operatorBtns === '+') {
    add(n1, n2);
} else if (operatorBtns === '-') {
    subtract(n1, n2);
} else if (operatorBtns === '×') {
    multiply(n1, n2);
} else if (operatorBtns === '÷') {
    divide(n1, n2);
}


function add(n1, n2) {
    return n1 + n2
}

function subtract(n1,n2) {
    return n1 - n2
}

function multiply(n1, n2) {
    return n1 * n2
}

function divide(n1, n2) {
    if (n2 != 0) {
        return n1/n2
    }
}
//addEventListeners to buttons;

