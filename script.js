let currentInput = "";
let firstNum = "";
let operator = "";

const display = document.getElementById("display");

// 1. Update the display when numbers or operators are clicked
function appendToDisplay(value) {
  if (["+", "-", "*", "/"].includes(value)) {
    firstNum = currentInput;
    operator = value;
    currentInput = "";
  } else {
    currentInput += value;
  }
  display.value = currentInput || firstNum;
}

// 2. Clear everything
function clearDisplay() {
  currentInput = "";
  firstNum = "";
  operator = "";
  display.value = "";
}

// 3. The "Magic" - Sending data to your Backend
async function calculate() {
  const secondNum = currentInput;

  if (!firstNum || !secondNum || !operator) return;

  try {
    // We fetch the result from your Node.js server running on port 5000
    const response = await fetch("http://localhost:5000/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        num1: firstNum,
        num2: secondNum,
        operator: operator,
      }),
    });

    const data = await response.json();

    // Show the result from the server
    display.value = data.result;
    currentInput = data.result; // Allow the user to keep calculating
    firstNum = "";
  } catch (error) {
    display.value = "Error";
    console.error("Connection to Backend failed:", error);
  }
}
