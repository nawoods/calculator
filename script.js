function capitalize (str) {
    return str.slice(0, 1).toUpperCase + str.slice(1).toLowerCase;
}

const buttonShortNames = ['plusminus', 'squareroot', 'percent', 'divide',
                          '7', '8', '9', 'multiply',
                          '4', '5', '6', 'subtract',
                          '1', '2', '3', 'add',
                          'clear', '0', 'decimal', 'equals'];
                          
const buttons = {};

for (let i = 0; i < buttonShortNames.length; i++) {
    let shortName = buttonShortNames[i];
    buttons[shortName] = document.querySelector('.button-' + shortName);
    buttons[shortName].addEventListener('click', onButtonClick);
}

function onButtonClick() {
    console.log(this.innerHTML);
}