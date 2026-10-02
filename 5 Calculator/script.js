/*
    ALGORITHM: On-Screen Evaluator Calculator

    1. SETUP:
       - Get the input/display element (configured as read-only).
       - Select all calculator buttons.

    2. APPEND FUNCTION (`appendToDisplay(input)`):
       - Get the current value of the display.
       - Append the passed character (`input`) to the display value.

    3. CLEAR FUNCTION (`clearDisplay()`):
       - Reset the display value to an empty string `""`.

    4. CALCULATE FUNCTION (`calculate()`):
       - Wrap computation in a `try...catch` block.
       - Inside `try`:
           - Evaluate the arithmetic expression from display using `eval(display.value)`.
           - Update display value with the calculated result.
       - Inside `catch (error)`:
           - Set display value to `"Error"` if the expression is invalid.

    5. EVENT HANDLING:
       - Map button clicks to call `appendToDisplay()`, `clearDisplay()`, or `calculate()` accordingly.
*/

// WRITE YOUR CODE BELOW:
// SETUP

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");


// APPEND FUNCTION

function appendToDisplay(input) {
    display.value += input;
}


// CLEAR FUNCTION

function clearDisplay() {
    display.value = "";
}


// CALCULATE FUNCTION

function calculate() {
    try {
        let expression = display.value;

        expression = expression.replaceAll("×", "*");
        expression = expression.replaceAll("÷", "/");
        expression = expression.replaceAll("−", "-");

        display.value = eval(expression);
    }
    catch (error) {
        display.value = "Error";
    }
}