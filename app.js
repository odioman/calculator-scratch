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

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.dataset.value;
        console.log(value);
        currentOpScreen.textContent += value;

        if (value === '=') {
            if (currentOpScreen.textContent.includes('÷')) {
                const equation = currentOpScreen.textContent.split('÷')
                const numberWithoutEqSign = equation[1].split('')
                const equation1 = numberWithoutEqSign[0]
                operate('÷', equation[0], equation1)
                lastOpScreen.textContent = `${equation[0]} ÷ ${equation1}`
                console.log(equation);
            } else if (currentOpScreen.textContent.includes('+')) {
                const equation = currentOpScreen.textContent.split('+')
                const numberWithoutEqSign = equation[1].split('') 
                const equation1 = numberWithoutEqSign[0]
                operate('+', equation[0], equation1)
                lastOpScreen.textContent = `${equation[0]} + ${equation[1]}`
            } else if (currentOpScreen.textContent.includes('×')) {
                const equation = currentOpScreen.textContent.split('')
                operate('×', equation[0], equation[2])
                lastOpScreen.textContent = `${equation[0]} × ${equation[2]}`
            }
        }
    })
})

