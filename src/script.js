let currentInput = "";
let operator = "";
let firstInput = "";

console.log('Script loaded');  // To confirm that the script file is loaded

function appendNumber(number) {
    console.log('appendNumber called with:', number); // To trace function calls
    currentInput += number;
    document.getElementById('display').innerText = currentInput;
}

function setOperation(op) {
    if (currentInput === "") return;
    operator = op;
    firstInput = currentInput;
    currentInput += " " + operator + " ";
    document.getElementById('display').innerText = currentInput;
}

function calculate() {
    let result;
    const parts = currentInput.split(" ");
    firstInput = parts[0];
    operator = parts[1];
    currentInput = parts[2];

    const prev = parseFloat(firstInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    
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
                alert("Cannot divide by zero");
                clearAll();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = "";
    firstInput = "";
    document.getElementById('display').innerText = currentInput;
}

function clearAll() {
    currentInput = "";
    operator = "";
    firstInput = "";
    document.getElementById('display').innerText = "0";
}
