//query selectors for currentOperationScreen, lastOperationScreen, buttons;
const lastOpScreen = document.querySelector('.lastOperationScreen');
const currentOpScreen = document.querySelector('.currentOperationScreen');
const buttons = document.querySelectorAll('button');
const operatorBtns = document.querySelectorAll('.operation');
const pointBtn = document.querySelector('#point');
const numberBtns = document.querySelectorAll('.number');
const equalsBtn = document.querySelector('.equals');

let isDecimal = false;


let currentNumberString = ''
let numbersArr = [];

function stringifyAndArrEquation() {
    currentNumberString = currentOpScreen.textContent;
    console.log(currentNumberString);
    //pushes ['9', '9+', '9+1'] - last index is the equation that is needed
    numbersArr.push(currentNumberString);
    console.log(numbersArr[numbersArr.length - 1]);
    //regex keeps decimal numbers together, and splits operators from numbers, works well
    const split = numbersArr[numbersArr.length - 1].match(/\d+\.\d+|\d+|[^0-9]/g)
    console.log(split)
    for (let i=0; i < split.length; i++) {
        if (split[i] === ('÷' || '×')) {
            const splitEquation = `${split[i-1]} ${split[i]} ${split[i+1]}`
            console.log('splitEquation: ', splitEquation);
        } else if (split[i] === ('+'||'-')) { 
            const splitEquationforAddSub = `${split[i-1]} ${split[i]} ${split[i+1]}`
            console.log('splitEquationforAddSub: ', splitEquationforAddSub);
        }
    }
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

function PEMDAS(inputs){
    let modifiedInputs = inputs
    if(modifiedInputs.includes("÷")){
      modifiedInputs = runOp(modifiedInputs,"÷",divide)
    } 
    if (modifiedInputs.includes("×")){
      modifiedInputs = runOp(modifiedInputs,"×",multiply)
    } 
    if (modifiedInputs.includes("+")){
      modifiedInputs = runOp(modifiedInputs,"+",add)
    } 
    if (modifiedInputs.includes("-")){
      modifiedInputs = runOp(modifiedInputs,"-",subtract)
    }
    return modifiedInputs;
  }

function runOp(inputarr,operator,operation){
    while(inputarr.includes(operator)){
          const indexOp = inputarr.indexOf(operator)
          inputarr.splice(indexOp - 1,3,operation(Number(inputarr[indexOp - 1]) , Number(inputarr[indexOp + 1])))
          console.log(inputarr)
    }
    return inputarr
}

function calculate() {
    result = PEMDAS(numbersArr[numbersArr.length - 1])
    currentOpScreen.textContent = result;
}

equalsBtn.addEventListener('click', calculate)

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

/*

const equalsKey = document.getElementById('equalsKey');
const display = document.getElementById('result');
const clear = document.getElementById('clear');
const numbersAndOperators = document.querySelectorAll('.operator, .number');

let firstNumber;
let currentOperator;
let secondNumber;
let tempArray = [];


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// When the user hits any button or operator push them to the array after validating.
numbersAndOperators.forEach((numberOrOperator) => {
    numberOrOperator.addEventListener('click', (e) => {
       // TODO: validate next input here 
        tempArray.push(e.target.value); // store value to temparray
        console.log(tempArray);
        display.innerHTML = tempArray.join(""); // display from array
    });
});

// Go through the array and identify if operators occording to the order of 
// BODMAS is present, and execute that operator for the operands left and right to it if found.
function validateBODMAS(inputs){
  let modifiedInputs = inputs
  if(modifiedInputs.includes("÷")){
    modifiedInputs = runOpp(modifiedInputs,"÷",divide)
  } 
  if (modifiedInputs.includes("*")){
    modifiedInputs = runOpp(modifiedInputs,"*",multiply)
  } 
  if (modifiedInputs.includes("+")){
    modifiedInputs = runOpp(modifiedInputs,"+",add)
  } 
  if (modifiedInputs.includes("-")){
    modifiedInputs = runOpp(modifiedInputs,"-",subtract)
  }
  return modifiedInputs;
}

// Run the operator for all opperands of a particular operator.
// replace the result with operands and operator.
function runOp(inputarr,oppSymbol,oppCallback){
  while(inputarr.includes(oppSymbol)){
        const indexOpp = inputarr.indexOf(oppSymbol)
        inputarr.splice(indexOpp - 1,3,oppCallback(Number(inputarr[indexOpp - 1]) , Number(inputarr[indexOpp + 1])))
        console.log(inputarr)
  }
  return inputarr
}

function calculate() {
    result = validateBODMAS(tempArray)
    display.textContent = result;
}

clear.addEventListener('click', function () {
    display.textContent = '';
    tempArray = [];
})

equalsKey.addEventListener('click', calculate);

*/

  