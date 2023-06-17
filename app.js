//query selectors for currentOperationScreen, lastOperationScreen, buttons;
const lastOpScreen = document.querySelector('.lastOperationScreen');
const currentOpScreen = document.querySelector('.currentOperationScreen');
const buttons = document.querySelectorAll('button');
const operatorBtns = document.querySelectorAll('.operation');
const pointBtn = document.querySelector('#point');
const numberBtns = document.querySelectorAll('.number');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('#all-clear')
const backspaceBtn = document.querySelector('#backspace')

let currentNumberString = ''
let tempSolution = '';

function stringifyEquation() {
    currentNumberString = currentOpScreen.textContent;
    console.log(currentNumberString);
    //regex keeps decimal numbers together, and splits operators from numbers, works well
    const currentEquation = currentNumberString.match(/\d+\.\d+|\d+|[^0-9]/g)
    console.log(currentEquation)
    //loop over the parts of split
    if (currentEquation.includes('=')) {
        if (currentEquation.includes('÷')||currentEquation.includes('×') || currentEquation.includes('+') || currentEquation.includes('-')) {
            //put it in the operate function to get the result, call operate function
            operate(currentEquation[1], currentEquation[0], currentEquation[2]);
            console.log('tempSolution: ', tempSolution);
            currentOpScreen.textContent = tempSolution;
            lastOpScreen.textContent = currentNumberString;
        }
    }
}

// allow one decimal per number


//append numbers to currentOpScreen
numberBtns.forEach(number => {
    number.addEventListener('click', () => {
        digitPressed(number.textContent)
    })
})

let decimalCount = 0;

function digitPressed(digit) {
    currentOpScreen.textContent += digit;
    console.log("digit pressed: ", digit);
    stringifyEquation()
}


//append operators to currentOpScreen
operatorBtns.forEach(operator => {
    operator.addEventListener('click', () => {
        operatorPressed(operator.textContent)
    })
})

function operatorPressed(operator) {
    currentOpScreen.textContent += operator;
    console.log("operator pressed: ", operator);
    //validation for one operator here
    
    stringifyEquation()

}

function appendDecimal() {
    currentOpScreen.textContent += '.';
}

pointBtn.addEventListener('click', appendDecimal);

if (currentOpScreen.textContent.includes('.')) {
    console.log('we have a decimal');
    pointBtn.removeEventListener('click', appendDecimal)
} else if (currentOpScreen.textContent.includes('+'||'-')) {
    pointBtn.addEventListener('click', appendDecimal)
}

const validValue = /^(\d+(\.\d*)?)?$/.test(currentOpScreen.textContent)

if (!validValue) {
    console.log("validValue: ", validValue)
    pointBtn.removeEventListener('click', appendDecimal)
} else if (currentOpScreen.textContent.includes('+'||'-')) {
    pointBtn.addEventListener('click', appendDecimal)
}

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
    console.log("operate called")
    const n1 = Number(num1);
    const n2 = Number(num2);
    if (operator === '÷') {
        tempSolution = (divide(n1, n2))
        console.log(divide(n1, n2))
        currentNumberString = tempSolution;
        console.log("operate's currentNumberString: ", currentNumberString)
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


/* function PEMDAS(inputs){
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
        console.log(inputarr);
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

/* 
decimal.addEventListener("click", function() {
    
        if (chosenOperator == undefined && resultDisplay.textContent!="") {
            userInput = undefined;
            userInput = "."; 
            resultDisplay.textContent = "";
            previousEntry.textContent = ""; 
            previousEntry.textContent = ".";
        }  
        
        else if (previousEntry.textContent.includes(".") && chosenOperator==undefined) {
        }
       
        else if (typeof userInput == "string" && userInput.indexOf(".")!=-1) {
        }

        else {
            userInput = userInput + ".";
            previousEntry.textContent += ".";
        }
    
    decimal.blur();
});

*/
  