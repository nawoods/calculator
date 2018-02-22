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
}

function processNumberButton(str) {
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
    if (calculatorState.binaryOperator !== '') {
        computeBinary();
        moveToNextOperation();
    }

    calculatorState.binaryOperator = str;
}

function computeBinary() {
    console.log("bleep bleep i'm a computer doing math");
}


function updateScreen(str) {
    screen.innerHTML = str;
}

function moveToNextOperation() {
    calculatorState.number1 = calculatorState.number2;
    calculatorState.binaryOperator = '';
    calculatorState.number2 = '0';
    calculatorState.compuation = false;
}

    

function clear() {
    calculatorState.number1 = '0';
    calculatorState.binaryOperator = '';
    calculatorState.number2 = '0';
    calculatorState.computation = false;
    updateScreen(calculatorState.number1);
}
