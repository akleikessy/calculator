const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        //overwrite 'displayValue' if the current value is '0' otherwise append to it.
        calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
    }

    //console.log(calculator);
}

function operate(firstOperand, secondOperand, operator){
    if (operator === "+"){
        return firstOperand + secondOperand;
    } else if (operator === "-"){
        return firstOperand - secondOperand;
    } else if (operator === "*"){
        return firstOperand * secondOperand;
    } else if (operator === "/"){
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator(){
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;

    console.log(calculator);
}

function inputDecimal(dot) {
    if(calculator.waitingForSecondOperand === true){
        calculator.displayValue = "0.";
        calculator.waitingForSecondOperand = false;
    }

    //if the 'displayValue' does not contain a decimal point
    //apend the decimal point
    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    //destructure the properties on the calculator object
    const { firstOperand, displayValue, operator } = calculator;
    // 'parseFloat' converts the string content of 'displayValue' to a floating-point number
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
    
    //verify that 'firstOperand' is "null" and that the 'inputValue' is not a 'NaN' value
    if (firstOperand === null && !isNaN(inputValue)){
        //update the firstOperand property
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = operate(firstOperand, inputValue, operator);
        //calculator.displayValue = String(result);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    
    console.log(calculator);

}

console.log(calculator);

function updateDisplay() {
    //select element with class 'display'
    const display = document.querySelector(".display");
    //update the content of the element with the content of 'displayValue'
    display.value = calculator.displayValue;
    //display.value = "6";
}
updateDisplay();


const keys = document.querySelectorAll(".key"); //returns NodeList
//access the NodeList
keys.forEach((key) => {
    //console.log(key);
    key.addEventListener("click", (event) => {
        //access clicked event
        const { target } = event; //this is equivalent to const target = event.target;

        //check if the clicked element is a button.
        //if not, exit from the function
        if (!target.matches("button")) {
            return;
        }

        if (target.classList.contains("operator")){
            //console.log("Operator", target.value);
            handleOperator(target.value);
            updateDisplay();
            return;
        }
        if (target.classList.contains("decimal")){
            //console.log("Decimal", target.value);
            inputDecimal(target.value);
            updateDisplay();
            return;
        }
        if (target.classList.contains("all-clear")){
            //console.log("Clear", target.value);
            resetCalculator();
            updateDisplay();
            return;
        }

       // console.log("Digit", target.value);
        inputDigit(target.value);
        updateDisplay();
    })
})

