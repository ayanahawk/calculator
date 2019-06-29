/* eslint-disable no-restricted-globals */
class Calculator {
  // a class to update the current text and value in the calculator
  // eslint-disable-next-line no-shadow
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  delete() {}
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    // appending numbers to display and not adding them
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;

    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

// selecting and creating variables from classes made in HTML file
const numberButtons = document.querySelectorAll('[data-number]');

const operationButtons = document.querySelectorAll('[data-operation');

const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete');
const allClearButton = document.querySelector('[data-all-clear]');
// elements that are on display
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  ' [data-current-operand]'
);

// passing from my constructor, made calculator class. This is an object created named calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// looping over buttons, when the buttons are clicked, adding/updating on display. Updating my object named calculator
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
  console.log(button.innerText);
});

//
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
  console.log(this.operation);
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});
