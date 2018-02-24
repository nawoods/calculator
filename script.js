// 'internal memory' of the calculator
const calcState = {
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
    
    if (this.classList.contains('unary-operator')) {
        processUnaryOperator(this.innerHTML);
        return;
    }
    
    if (this.classList.contains('button-equals')) {
        processEquals();
        return;
    }
    
    if (this.classList.contains('button-plusminus')) {
        processPlusminus();
        return;
    }
    
    if (this.classList.contains('button-decimal')) {
        processDecimal();
        return;
    }
}

function processNumberButton(str) {
    console.log('hi');
    if (calcState.computation) clear();
    let currentNumber = 'number' + 
            (calcState.binaryOperator === '' ? 1 : 2);
            
    switch (calcState[currentNumber]) {
        case ('0'):
            calcState[currentNumber] = str;
            break;
        case ('-0'):
            calcState[currentNumber] = '-' + str;
            break;
        default:
            calcState[currentNumber] += str;
    }
    
    updateScreen(calcState[currentNumber]);
}

function processBinaryOperator(str) {
    if (!calcState.computation && calcState.binaryOperator !== '') {
        computeBinary();
    }
    
    calcState.computation = false;
    calcState.number2 = "0";
    calcState.binaryOperator = str;
}

function processUnaryOperator(operator) {
    console.log('hey');
    if (calcState.binaryOperator === '') {
        calcState.number1 = computeUnary(calcState.number1, operator);
    } else {
        calcState.number2 = computeUnary(calcState.number2, operator);
        computeBinary();
        calcState.binaryOperator = '';
        calcState.number2 = '0';
        calcState.computation = false;
    }
    
    updateScreen(calcState.number1);
}

function processEquals() {
    if (calcState.binaryOperator !== '') {
        computeBinary();
    }
}

function processPlusminus() {
    let currentNumber = 'number' + 
            (calcState.computation || calcState.binaryOperator === '' ? 1 : 2);
    if (calcState[currentNumber].includes('-')) {
        calcState[currentNumber] = calcState[currentNumber].slice(1);
    } else {
        calcState[currentNumber] = '-' + calcState[currentNumber];
    }
    updateScreen(calcState[currentNumber]);
}

function processDecimal() {
    if (calcState.computation) clear();
    
    let currentNumber = 'number' + 
            (calcState.binaryOperator === '' ? 1 : 2);
    if (calcState[currentNumber].includes('.')) {
        return;
    }
    
    calcState[currentNumber] += '.';
    updateScreen(calcState[currentNumber]);
}

/* computeBinary and computeUnary work a bit differently.
   computeBinary takes no arguments, instead directly manipulating calcState.
   computeUnary takes and returns arguments; calcState is manipulated in 
   the processUnaryOperator function.
*/
function computeBinary() {
    switch (calcState.binaryOperator) {
        case '+':
            calcState.number1 = (+calcState.number1 + 
                +calcState.number2).toString();
            break;
        case '-':
            calcState.number1 = (+calcState.number1 - 
                +calcState.number2).toString();
            break;
        case '×':
            calcState.number1 = (+calcState.number1 * 
                +calcState.number2).toString();
            break;
        case '÷':
            calcState.number1 = (+calcState.number1 / 
                +calcState.number2).toString();
            break;
    }
    
    updateScreen(calcState.number1);
    calcState.computation = true;
}

function computeUnary(num, operator) {
    switch (operator) {
        case '%':
            num *= .01;
            break;
        case '√':
            num = Math.sqrt(num);
    }
    
    return num;
}


function updateScreen(str) {
    // round numbers so that 8 digits (incl minus sign) appear on screen
    if (!isNaN(+str) && str.includes('.')) {
        const places = str.indexOf('.');
        console.log(places);
        const factor = Math.pow(10, 9 - places);
        str = Math.round(+str * factor) / factor;
    }
    screen.innerHTML = str;
}


function clear() {
    calcState.number1 = '0';
    calcState.binaryOperator = '';
    calcState.number2 = '0';
    calcState.computation = false;
    updateScreen(calcState.number1);
}
