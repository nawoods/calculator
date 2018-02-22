function capitalize (str) {
    return str.slice(0, 1).toUpperCase + str.slice(1).toLowerCase;
}

// 'internal memory' of the calculator
const calculatorState = {
    number1: '0',
    binaryOperator: '',
    number2: '0',
    clearOnEntry: false, // whether pressing any button clears the above variables
}

const buttonShortNames = ['plusminus', 'squareroot', 'percent', 'divide',
                          '7', '8', '9', 'multiply',
                          '4', '5', '6', 'subtract',
                          '1', '2', '3', 'add',
                          'clear', '0', 'decimal', 'equals'];
                          
const buttons = {};
const screen = document.querySelector('.calculator-screen')

for (let i = 0; i < buttonShortNames.length; i++) {
    let shortName = buttonShortNames[i];
    buttons[shortName] = document.querySelector('.button-' + shortName);
    buttons[shortName].addEventListener('click', onButtonClick);
}

function onButtonClick() {
    if (calculatorState.clearOnEntry) clear();
    updateScreen(this.innerHTML);
    
    if (this.classList.contains('button-clear')) {
        clear();
        return;
    }
    
    if (this.classList.contains('number')) {
        onNumberButtonClick(this.innerHTML);
        return;
    }
}

function onNumberButtonClick(str) {
    let currentNumber = 'number' + (calculatorState.binaryOperator === '' ? 1 : 2);
    if (calculatorState[currentNumber] !== '0') {
        calculatorState[currentNumber] += str;
    } else if (str !== 0) {
        calculatorState[currentNumber] = str;
    }
    updateScreen(calculatorState[currentNumber]);
}

function updateScreen(str) {
    screen.innerHTML = str;
}

function clear() {
    calculatorState.number1 = '0';
    calculatorState.binaryOperator = '';
    calculatorState.number2 = '0';
    calculatorState.clearOnEntry = false;
    updateScreen(calculatorState.number1);
}