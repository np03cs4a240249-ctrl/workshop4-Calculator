let expression = "";
const display = document.getElementById("display");

function updateDisplay() {
  display.value = expression || "0";
}

function appendToDisplay(value) {
  const lastChar = expression[expression.length - 1];

  // Prevent starting with invalid operators
  if (expression === "" && ["+", "*", "/", "%"].includes(value)) {
    return;
  }

  // Prevent two operators together
  if (["+", "-", "*", "/", "%"].includes(lastChar) &&
      ["+", "-", "*", "/", "%"].includes(value)) {
    expression = expression.slice(0, -1) + value;
    updateDisplay();
    return;
  }

  // Prevent multiple dots in one number
  if (value === ".") {
    let parts = expression.split(/[\+\-\*\/%]/);
    let currentPart = parts[parts.length - 1];
    if (currentPart.includes(".")) {
      return;
    }
  }

  expression += value;
  updateDisplay();
}

function clearDisplay() {
  expression = "";
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (expression === "") return;

  try {
    let result = eval(expression);

    // Handle invalid result
    if (!isFinite(result)) {
      display.value = "Error";
      expression = "";
      return;
    }

    expression = result.toString();
    updateDisplay();
  } catch (error) {
    display.value = "Error";
    expression = "";
  }
}

// Keyboard support
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
    appendToDisplay(key);
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

// Show 0 at start
updateDisplay();