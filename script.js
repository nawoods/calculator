const buttonPlusminus = document.querySelector('.button-plusminus');
const buttonSquareroot = document.querySelector('.button-squareroot');
const buttonPercent = document.querySelector('.button-percent');
const buttonDivide = document.querySelector('.button-divide');

const button7 = document.querySelector('.button-7');
const button8 = document.querySelector('.button-8');
const button9 = document.querySelector('.button-9');
const buttonMultiply = document.querySelector('.button-multiply');

const button4 = document.querySelector('.button-4');
const button5 = document.querySelector('.button-5');
const button6 = document.querySelector('.button-6');
const buttonSubtract = document.querySelector('.button-subtract');

const button1 = document.querySelector('.button-1');
const button2 = document.querySelector('.button-2');
const button3 = document.querySelector('.button-3');
const buttonAdd = document.querySelector('.button-add');

const buttonClear = document.querySelector('.button-clear');
const button0 = document.querySelector('.button-0');
const buttonDecimal = document.querySelector('.button-decimal');
const buttonEquals = document.querySelector('.button-equals');

const buttons = [buttonPlusminus, buttonSquareroot, buttonPercent, buttonDivide,
                 button7, button8, button9, buttonMultiply,
                 button4, button5, button6, buttonSubtract,
                 button1, button2, button3, buttonAdd,
                 buttonClear, button0, buttonDecimal, buttonEquals];
                 
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', onButtonClick);
}

function onButtonClick() {
    console.log(this.innerHTML);
}