"use strict";

const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");

const equalsBtn = document.getElementById("equals");
const funcBtns = document.querySelectorAll(".func");

const currentText = document.querySelector(".currentText");
const previousText = document.querySelector(".previousText");

let previousOperand = "";
let currentOperand = "";
let operation = undefined;

function clearAll() {
  previousOperand = "";
  currentOperand = "";
  operation = undefined;
  output.style.fontSize = "50px";
}

function backSpace() {
  currentOperand = currentOperand.toString().slice(0, -1);
  changeSize();
}

function percent() {
  if (currentOperand === "") return;
  const curr = parseFloat(currentOperand);
  currentOperand = curr / 100;
  currentOperand = currentOperand;
}

function display() {
  currentText.innerHTML = currentOperand;
  if (operation !== undefined) {
    previousText.innerHTML = `${previousOperand}${operation}`;
  } else {
    previousText.innerHTML = "";
  }

  if (currentOperand === "" && operation === undefined) {
    currentText.innerHTML = "0";
  }
  if (currentOperand !== "") {
    operation === undefined;
  }
}

function apendNumber(num) {
  if (num === "." && currentOperand.includes(".")) return;
  if (num === "." && currentText.innerHTML === "0") {
    currentOperand = "0";
  }
  if (num === "0" || currentOperand === "0") return;
  currentOperand = currentOperand + num;
}

function selectOpr(opr) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calc();
  }

  operation = opr;
  previousOperand = currentOperand;
  currentOperand = "";
}

function calc() {
  let result;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (!isNaN(prev) && !isNaN(curr))
    switch (operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "x":
        result = prev * curr;
        break;
      case "÷":
        result = prev / curr;
        break;

      default:
        return;
    }

  currentOperand = result;
  result = "";
  operation = undefined;
  previousOperand = "";
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    changeSize();
    apendNumber(number.innerHTML);
    display();
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (currentOperand !== "" && previousOperand !== "") {
      calc();
      display();
    } else {
      selectOpr(operator.innerHTML);
      display();
      changeSize();
    }
  });
});
equalsBtn.addEventListener("click", () => {
  if (currentOperand === "" || operation === undefined) return;
  calc();
  display();
});

funcBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    switch (btn.innerHTML) {
      case "AC":
        clearAll();
        display();
        break;
      case "DEL":
        backSpace();
        display();
        break;
      case "%":
        percent();
        display();
        break;
      case ",":
        let dot = ".";
        apendNumber(dot);
        display();
      default:
        break;
    }
  });
});
const output = document.querySelector(".output");

function changeSize() {
  const outputWidth = currentText.clientWidth + previousText.clientWidth;
  console.log(outputWidth);
  console.log(output.style.fontSize);
  if (currentText.clientWidth + previousText.clientWidth > 250) {
    output.style.fontSize = "35px";
  }
  if (
    currentText.clientWidth + previousText.clientWidth < 250 &&
    output.style.fontSize === "35px"
  ) {
    output.style.fontSize === "50px";
  }
  if (currentText.clientWidth + previousText.clientWidth > 253) {
    output.style.fontSize = "25px";
  }
}
display();
