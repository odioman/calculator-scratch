//query selectors for currentOperationScreen, lastOperationScreen, buttons;
const lastOpScreen = document.querySelector('.lastOperationScreen');
const currentOpScreen = document.querySelector('.currentOperationScreen');
const operatorBtns = document.querySelectorAll('.operation');
const pointBtn = document.querySelector('.point');
const numberBtns = document.querySelectorAll('.number');
const clearBtn = document.querySelector('#all-clear')
const backspaceBtn = document.querySelector('#backspace')

let currentEquationString = ''
let tempSolution = '';

function stringifyEquation() {
    currentEquationString = currentOpScreen.textContent;
    //regex keeps decimal Equations together, and splits operators from Equations, works well
    const currentEquation = currentEquationString.match(/\d+\.\d+|\d+|[^0-9]/g)
    //loop over the parts of split
    if (currentEquation.includes('=')) {
        if (currentEquation.includes('÷')||currentEquation.includes('×') || currentEquation.includes('+') || currentEquation.includes('-')) {
            //put it in the operate function to get the result, call operate function
            operate(currentEquation[1], currentEquation[0], currentEquation[2]);
            currentOpScreen.textContent = tempSolution
            lastOpScreen.textContent = currentEquationString;
        }
    }
}

//append numbers to currentOpScreen
numberBtns.forEach(number => {
    number.addEventListener('click', () => {
        digitPressed(number.textContent)
    })
})

let decimalCount = 0;

function digitPressed(digit) {
    currentOpScreen.textContent += digit;
    stringifyEquation()
}

//append operators to currentOpScreen
operatorBtns.forEach(operator => {
    operator.addEventListener('click', () => {
        operatorPressed(operator.textContent)
    })
})

function operatorPressed(operator) {
    //split currentEquationString
    const splitCurEqString = currentEquationString.match(/\d+\.\d+|\d+|[^0-9]/g)
    //get last item is an operator
    const lastItem = splitCurEqString[splitCurEqString.length - 1]
    //check if lastItem is an operator
    const operatorCheck = lastItem.includes('+')|| lastItem.includes('-')|| lastItem.includes('÷')||lastItem.includes('×')
    //if lastItem is an operator, do nothing
    if (operatorCheck) {
        return
    } else {
        currentOpScreen.textContent += operator;
    }
    stringifyEquation()
}

function appendDecimal() {
    //append decimal only once per number by figuring out what number is and if it has decimal already 
    //current number is number + decimal + number
    console.log("currentEquationString in appendDecimal: ", currentEquationString);
    //const splitCurEqString = currentEquationString.split('+'||'-'||'÷'||'×')
    const splitCurEqString = currentEquationString.match(/\d+\.\d+|\d+|[^0-9]/g)
    console.log('splitCurEqString:', splitCurEqString);
    //get last number of array with [length-1] 
    const currentNumber = splitCurEqString[splitCurEqString.length - 1];
    //check if currentNumber has decimal
    const decimalCheck = currentNumber.includes('.')
    //if it has decimal, return (do nothing)
    if (decimalCheck) {
        return
    } else {
        //if it does not have decimal, add decimal
        currentOpScreen.textContent += '.'
    } 
}

pointBtn.addEventListener('click', appendDecimal);

function allClear() {
    currentOpScreen.textContent = '';
    lastOpScreen.textContent = '';
}

//clear the calculator of all text
clearBtn.addEventListener('click', allClear);

function backspace() {
    currentOpScreen.textContent = currentOpScreen.textContent.slice(0,-1);
}

//takes away last entry on currentOpScreen
backspaceBtn.addEventListener('click', backspace);

//addition, subtraction, multiplication, division 

function add(n1, n2) {
    return parseFloat(n1) + parseFloat(n2)
}

function subtract(n1,n2) {
    return parseFloat(n1) - parseFloat(n2)
}

function multiply(n1, n2) {
    return parseFloat(n1) * parseFloat(n2)
}

function divide(n1, n2) {
    if (n2 != 0) {
        return parseFloat(n1) / parseFloat(n2)
    }
}

function operate(operator, num1, num2) {
    const n1 = Number(num1);
    const n2 = Number(num2);
    if (operator === '÷') {
        tempSolution = (divide(n1, n2))
        currentEquationString = tempSolution;
    } else if (operator === '×') {
        tempSolution = (multiply(n1, n2))
    } else if (operator === '+') {
        tempSolution = (add(n1, n2))
    } else if (operator === '-') {
        tempSolution = (subtract(n1, n2))
    }
}


//keyboard accessbility 
document.addEventListener('keydown', (event) => {
    if (event.key >= 0 || event.key <= 9) {
        currentOpScreen.textContent += event.key 
    } else if (event.key === 'Backspace') {
        currentOpScreen.textContent = currentOpScreen.textContent.slice(0,-1)
    } else if (event.key === 'Delete') {
        currentOpScreen.textContent = '';
        lastOpScreen.textContent = '';
    } else if (event.key === '*') {
        currentOpScreen.textContent += '×';
    } else if (event.key === '/') {
        currentOpScreen.textContent += '÷';
    } else if (event.key === '+') {
        currentOpScreen.textContent += event.key;
    } else if (event.key === '-') {
        currentOpScreen.textContent += event.key;
    } else if (event.key === '.') {
        currentOpScreen.textContent += event.key;
    }
 })

