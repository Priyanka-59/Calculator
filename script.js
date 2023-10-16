const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clear-button');
const addBtn = document.getElementById('add-button');
const subtractBtn = document.getElementById('subtract-button');
const multiplyBtn = document.getElementById('multiply-button');
const divideBtn = document.getElementById('divide-button');
const equalBtn = document.getElementById('equal-button');
const decimalBtn = document.getElementById('decimal-button');
const numberBtns = document.querySelectorAll('.number');

// Initialize a variable
let result = '';
let operation = '';
let previousOperand = 0;


//append number fxn
const appendNumber = (number) => {
  if (number === '.' && result.includes('.')) {
    return;
  }
  result += number;
  updateDisplay();


}
// fxn to update display
const updateDisplay = () => {
  if (operation) {
    resultElement.innerText = `${previousOperand} ${operation} ${result}`;
  }
  else {
    resultElement.innerText = result;
  }
}

// fxn to select operator
const selectOperator = (operatorValue) => {
  if (result === '') return;

  if (operation !== '' && previousOperand !== '') {
    calculateResult();
  }

  operation = operatorValue;
  previousOperand = result;
  result = '';
  updateDisplay();

}

// calculate result
const calculateResult = () => {
  let evaluateResult;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(result);

  if (isNaN(prev) || isNaN(curr)) return;
  switch (operation) {
    case '+':
      evaluateResult = prev + curr;
      break;
    case '-':
      evaluateResult = prev - curr;
      break;
    case '*':
      evaluateResult = prev * curr;
      break;
    case '/':
      evaluateResult = prev / curr;
      break;

    default:
      return;
  }
  result = evaluateResult.toString();
  operation = '';
  previousOperand = '';

}

// clear display fxn
const clearDisplay = () => {
  result = '';
  previousOperand = '';
  operation = '';
  updateDisplay();
}

// display on result & addevent Listener to number button
numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    //console.log(button.innerText);
    appendNumber(button.innerText);
  });
});

decimalBtn.addEventListener('click', () => appendNumber('.'));
addBtn.addEventListener('click', () => selectOperator('+'));
subtractBtn.addEventListener('click', () => selectOperator('-'));
multiplyBtn.addEventListener('click', () => selectOperator('*'));
divideBtn.addEventListener('click', () => selectOperator('/'));
equalBtn.addEventListener('click', () => {
  if (result === '') return;
  calculateResult();
  updateDisplay();
})

clearBtn.addEventListener('click', clearDisplay);