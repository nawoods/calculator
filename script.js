function capitalize (str) {
    return str.slice(0, 1).toUpperCase + str.slice(1).toLowerCase;
}

// 'internal memory' of the calculator
const calculatorState = {
    number1: '0',
    binaryOperator: '',
    number2: '0',
    computation: false,       // whether a computation just finished
}

const buttonShortNames = ['plusminus', 'squareroot', 'percent', 'divide',
                          '7', '8', '9', 'multiply',
                          '4', '5', '6', 'subtract',
                          '1', '2', '3', 'add',
                          'clear', '0', 'decimal', 'equals'];
                          
const buttons = {};
const screen = document.querySelector('.calculator-screen');

for (let i = 0; i < buttonShortNames.length; i++) {
    let shortName = buttonShortNames[i];
    buttons[shortName] = document.querySelector('.button-' + shortName);
    buttons[shortName].addEventListener('click', onButtonClick);
}

function onButtonClick() {
    updateScreen(this.innerHTML);
    
    if (this.classList.contains('button-clear')) {
        clear();
        return;
    }
    
    if (this.classList.contains('number')) {
        processNumberButton(this.innerHTML);
        return;
    }

    if (this.classList.contains('binary-operator')) {
        processBinaryOperator(this.innerHTML);
        return;
    }
    
    if (this.classList.contains('button-equals')) {
        processEquals();
        return;
    }
}

function processNumberButton(str) {
    console.log(calculatorState);
    if (calculatorState.computation) clear();

    let currentNumber = 'number' + 
            (calculatorState.binaryOperator === '' ? 1 : 2);
    if (calculatorState[currentNumber] !== '0') {
        calculatorState[currentNumber] += str;
    } else if (str !== 0) {
        calculatorState[currentNumber] = str;
    }
    updateScreen(calculatorState[currentNumber]);
}

function processBinaryOperator(str) {
    if (!calculatorState.computation && calculatorState.binaryOperator !== '') {
        computeBinary();
    }
    
    calculatorState.computation = false;
    calculatorState.number2 = "0";
    calculatorState.binaryOperator = str;
}

function processEquals() {
    if (calculatorState.binaryOperator !== '') {
        computeBinary();
    }
}

function computeBinary() {
    switch (calculatorState.binaryOperator) {
        case '+':
            calculatorState.number1 = (+calculatorState.number1 + +calculatorState.number2).toString();
            break;
        case '-':
            calculatorState.number1 = (+calculatorState.number1 - +calculatorState.number2).toString();
            break;
        case '×':
            calculatorState.number1 = (+calculatorState.number1 * +calculatorState.number2).toString();
            break;
        case '÷':
            calculatorState.number1 = (+calculatorState.number1 / +calculatorState.number2).toString();
            break;
    }
    
    updateScreen(calculatorState.number1);
    calculatorState.computation = true;
}


function updateScreen(str) {
    screen.innerHTML = str;
}


function clear() {
    console.log('i can see clearly now the rain is gone');
    calculatorState.number1 = '0';
    calculatorState.binaryOperator = '';
    calculatorState.number2 = '0';
    calculatorState.computation = false;
    updateScreen(calculatorState.number1);
}
