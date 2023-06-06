//query selectors for currentOperationScreen, lastOperationScreen, buttons;
const lastOpScreen = document.querySelector('.lastOperationScreen');
const currentOpScreen = document.querySelector('.currentOperationScreen');
const buttons = document.querySelectorAll('button');
const operatorBtns = document.querySelectorAll('.operation');
const pointBtn = document.querySelector('#point');
const numberBtns = document.querySelectorAll('.number');
let isDecimal = false;


let currentNumberString = ''
let numbersArr = [];
let operatorsArr = [];

function stringifyAndArrEquation() {
    currentNumberString = currentOpScreen.textContent;
    console.log(currentNumberString);
    numbersArr.push(currentNumberString);
    console.log(numbersArr);
    operatorsArr.forEach(operator => operator.push(operator))
    console.log(operatorsArr)
}

numberBtns.forEach(number => {
    number.addEventListener('click', () => {
        digitPressed(number.textContent)
    })
})

function digitPressed(digit) {
    currentOpScreen.textContent += digit;
    console.log("digit pressed: ", digit);
    stringifyAndArrEquation()
    
}

operatorBtns.forEach(operator => {
    operator.addEventListener('click', () => {
        operatorPressed(operator.textContent)
    })
})

function operatorPressed(operator) {
    currentOpScreen.textContent += operator;
    console.log("operator pressed: ", operator);
    stringifyAndArrEquation()

}

//addition, subtraction, multiplication, division 

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

function operate(operator, num1, num2) {
    const n1 = Number(num1);
    const n2 = Number(num2);
    if (operator === '÷') {
        currentOpScreen.textContent = divide(n1, n2)
        console.log(divide(n1, n2))
    } else if (operator === '×') {
        currentOpScreen.textContent = multiply(n1, n2)
    } else if (operator === '+') {
        currentOpScreen.textContent = add(n1, n2)
    } else if (operator === '-') {
        currentOpScreen.textContent = subtract(n1, n2)
    }
}
//addEventListeners to buttons;

//two event listeners for numbers(incl decimals) and operations
/*buttons.forEach(button => {
    button.addEventListener('click', getPartsReady)
})

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', getPartsReady);
})

function decimal() {
    if (currentOpScreen.textContent.includes('.')) {       
        console.log('decimal called');
        return  
    } 
}
*/
/* function getPartsReady(event) {
        const value = event.currentTarget.dataset.value;
        console.log(value);
        currentOpScreen.textContent += value;

        if (value === '=') {
            if (currentOpScreen.textContent.includes('÷')) {
                //split the string into two parts
                const equation = currentOpScreen.textContent.split('÷')
                //make sure element [1] doesn't have an equation sign attached to it
                const numberWithoutEqSign = equation[1].split('=')
                console.log(numberWithoutEqSign)
                //element without equation symbol
                const equation1 = numberWithoutEqSign[0]
                //the actual mathematics of the operation
                operate('÷', equation[0], equation1)
                //append to last screen to see the equation just performed
                lastOpScreen.textContent = `${equation[0]} ÷ ${equation1}`
                decimal()
            } else if (currentOpScreen.textContent.includes('+')) {
                const equation = currentOpScreen.textContent.split('+')
                const numberWithoutEqSign = equation[1].split('=') 
                const equation1 = numberWithoutEqSign[0]
                operate('+', equation[0], equation1)
                lastOpScreen.textContent = `${equation[0]} + ${equation1}`
                decimal();
            } else if (currentOpScreen.textContent.includes('×')) {
                const equation = currentOpScreen.textContent.split('×')
                const numberWithoutEqSign = equation[1].split('=');
                const equation1 = numberWithoutEqSign[0]
                operate('×', equation[0], equation1)
                lastOpScreen.textContent = `${equation[0]} × ${equation1}`
                decimal()
            } else if (currentOpScreen.textContent.includes('-')) {
                const equation = currentOpScreen.textContent.split('-');
                const numberWithoutEqSign = equation[1].split('=');
                const equation1 = numberWithoutEqSign[0];
                operate('-', equation[0], equation1);
                lastOpScreen.textContent = `${equation[0]} - ${equation1}`
                decimal()
            }
        } else if (value === '') {
            //takes away last entry 
            currentOpScreen.textContent = currentOpScreen.textContent.slice(0,-1);
        } else if (value === 'clear') {
            currentOpScreen.textContent = '';
            lastOpScreen.textContent = '';
        }
        decimal()
} */

/*
function cantClick() {
    operatorBtns.forEach(operatorBtn => operatorBtn.removeEventListener('click', getPartsReady));
    console.log('cantClick');
}
*/



  