// let equation = NaN;
// let operand = NaN;
// let operator = NaN;
let wholeNumber = true;

function calculator() {
    let input = document.querySelector("#input");

    let numbers = document.querySelectorAll(".number");
    numbers.forEach(each => each.addEventListener("click", () => {
        document.querySelector("#input").textContent += each.textContent;
    }));

    let operators = document.querySelectorAll(".operator");
    operators.forEach(each => each.addEventListener("click", () => {
        if (isOperator(getLastChar(input.textContent))) {
            input.textContent = input.textContent.slice(0, -1);
            input.textContent += each.id;
        } else if (containsOperator(input.textContent)) {
            input.textContent = operate(input.textContent);
            input.textContent += each.id;
        } else if (input.textContent.length > 0) {
            if (getLastChar(input.textContent) == ".") {
                input.textContent += "0";
            }
            input.textContent += each.id;
            document.querySelector("#period").disabled = false;
        }
    }));

    let equals = document.querySelector("#equals");
    equals.addEventListener("click", () => {
        let output = document.querySelector("#output");
        if (!isOperator(getLastChar(input.textContent)) &&
        containsOperator(input.textContent)) {
            output.textContent = operate(input.textContent);
            if (output.textContent == "Cannot divide by 0") {
                input.textContent = "";
            } else {
                input.textContent = output.textContent;
            }
        }
    });

    let period = document.querySelector("#period");
    period.addEventListener("click", () => {
        if (input.textContent.length == 0 || isOperator(getLastChar(input.textContent))) {
            document.querySelector("#input").textContent += 0;    
        }
        document.querySelector("#input").textContent += period.textContent;
        if (wholeNumber) {
            wholeNumber = !wholeNumber;
            period.disabled = true;
        }
    });

    let back = document.querySelector("#back");
    back.addEventListener("click", () => {
        if (input.textContent.length > 0) {
            input.textContent = input.textContent.slice(0, -1);
        }
    });

    let clear = document.querySelector("#clear");
    clear.addEventListener("click", () => {
        clearDisplay();
    });
}

function clearDisplay() {
    let displayLines = document.querySelectorAll(".display p");
    displayLines.forEach(each => each.textContent = "");
    input = "";
    actualInput = NaN;
    wholeNumber = true;
    document.querySelector("#period").disabled = false;
}

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

function containsOperator(text) {
    let charPresent = false;
    text.split("").forEach(each => {
        if (isOperator(each)) {
            charPresent = true;
        }
    });
    return charPresent;
}

function getLastChar(text) {
    return text.slice(text.length-1);
}

function add(left, right) {
    return left + right;
}

function sub(left, right) {
    return left - right;
}

function mult(left, right) {
    return left * right;
}

function div(left, right) {
    return left / right
}

function operate(equation) {
    let parts = equation.split(/[+*/-]/).map(each => {
        if (each.indexOf(".") != -1) {
            return parseFloat(each);
        }
        return parseInt(each);
    });
    let result = NaN;
    if (equation.indexOf("+") != -1) {
        result = add(parts[0], parts[1]);
    } else if (equation.indexOf("-") != -1) {
        result = sub(parts[0], parts[1]);
    } else if (equation.indexOf("*") != -1) {
        result = mult(parts[0], parts[1]);
    } else if (equation.indexOf("/") != -1) {
        if (parts[1] == 0) {
            result = "Cannot divide by 0";
        } else {
            result = div(parts[0], parts[1]);
        }
    }
    if (typeof result == typeof 0.0) {
        return Math.round(result*100)/100;
    }
    return result;
}

calculator();