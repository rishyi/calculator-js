const screen = document.getElementById('screen');
let currentValue = '';
let previousValue = '';
let operator = '';

const updateScreen = (value) => {
    screen.value = value;
};

const handleNumberClick = (number) => {
    currentValue += number;
    updateScreen(currentValue);
};

const handleOperatorClick = (selectedOperator) => {
    updateScreen(selectedOperator);
    if (currentValue === '') return;
    if (previousValue !== '') {
        calculate();
    }
    operator = selectedOperator;
    previousValue = currentValue;
    currentValue = '';
};

const calculate = () => {
    let result;
    const previous = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(previous) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            result = previous / current;
            break;
        default:
            return;
    }

    currentValue = result;
    operator = '';
    previousValue = '';
    updateScreen(currentValue);
};

const clearAll = () => {
    currentValue = '';
    previousValue = '';
    operator = '';
    updateScreen(currentValue);
};

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => handleNumberClick(button.getAttribute('data-number')));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => handleOperatorClick(button.getAttribute('data-action')));
});

document.querySelector('.equal-sign').addEventListener('click', calculate);

document.querySelector('.clear').addEventListener('click', clearAll);

document.querySelector('.decimal').addEventListener('click', () => {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateScreen(currentValue);
    }
});
