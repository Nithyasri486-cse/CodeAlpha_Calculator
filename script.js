let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;
let expression = '';

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else if (num === '.' && currentInput.includes('.')) {
            return;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    
    if (op !== '.') {
        expression = currentInput + ' ' + op + ' ';
        previousInput = currentInput;
        operator = op;
        shouldResetDisplay = true;
        currentInput = '0'; // Reset currentInput after operator
        updateDisplay();
    }
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        case '.':
            return;
        default:
            return;
    }

    expression = previousInput + ' ' + operator + ' ' + currentInput + ' = ';
    currentInput = result.toString();
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    expression = '';
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function updateDisplay() {
    // If operator pressed and waiting for next number, don't show the 0
    if (operator && currentInput === '0' && shouldResetDisplay) {
        display.textContent = expression.trim();
    } else {
        display.textContent = expression + currentInput;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+') { e.preventDefault(); appendOperator('+'); }
    if (e.key === '-') { e.preventDefault(); appendOperator('-'); }
    if (e.key === '*') { e.preventDefault(); appendOperator('*'); }
    if (e.key === '/') { e.preventDefault(); appendOperator('/'); }
    if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calculate(); }
    if (e.key === 'Backspace') { e.preventDefault(); deleteLast(); }
    if (e.key === 'Escape') clearDisplay();
});

updateDisplay();