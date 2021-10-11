const toggleBtn = document.querySelectorAll("input");
const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");
let prevOperand = prevOperandText.innerText;
let currentOperand = currentOperandText.innerText;
let operation;
const body = document.querySelector('body');
const selectedTheme = localStorage.getItem('theme');
function reset() {
	prevOperand = "";
	currentOperand = "";
	operation = undefined;
}
function deleteOperand() {
	currentOperand = currentOperand.toString().slice(0, -1);
}
function addNumber(number) {
	if (number === "." && currentOperand.includes(".")) return;
	currentOperand = currentOperand.toString() + number.toString();
}
function operationSelection(operate) {
	if (currentOperandText === "") return;
	if (prevOperandText !== "") {
		calculatorOperation();
	}
	operation = operate;
	prevOperand = currentOperand;
	currentOperand = "";
}
function calculatorOperation() {
	let result;
	let prev = parseFloat(prevOperand);
	let current = parseFloat(currentOperand);
	if (isNaN(prev) || isNaN(current)) return;
	switch (operation) {
		case "+":
			result = prev + current;
			break;

		case "-":
			result = prev - current
			break;

		case "×":
			result = prev * current;
			break;
		case "*":
			result = prev * current;
			break;
		case "/":
			result = prev / current;
			break;

		default:
			return;
	}
	currentOperand = result;
	operation = undefined;
	prevOperand = "";
	prevOperandText.innerText = "";
}
function displayNum() {
	currentOperandText.innerText = currentOperand.toLocaleString("en");
	if (operation !== undefined) {
		prevOperandText.innerText = `${prevOperand} ${operation.toString("en")}`;
	} else {
		prevOperandText.innerText = prevOperand;
	}
}
resetBtn.addEventListener("click", () => {
	reset();
	displayNum();
});
deleteBtn.addEventListener("click", () => {
	deleteOperand();
	displayNum();
});
operands.forEach(operand => {
	operand.addEventListener("click", () => {
		addNumber(operand.innerText);
		displayNum();
	});
});
operatorBtn.forEach(btn => {
	btn.addEventListener("click", () => {
		operationSelection(btn.innerText);
		displayNum();
	})
})
resultBtn.addEventListener("click", () => {
	calculatorOperation();
	displayNum();
});
window.addEventListener("keydown", (e) => {
	e.preventDefault()
	if (
		e.key === "0" ||
		e.key === "1" ||
		e.key === "2" ||
		e.key === "3" ||
		e.key === "4" ||
		e.key === "5" ||
		e.key === "6" ||
		e.key === "7" ||
		e.key === "8" ||
		e.key === "9" ||
		e.key === "."
	) {
		addNumber(e.key);
		displayNum();
	} else if (
		e.key === "96" ||
		e.key === "97" ||
		e.key === "98" ||
		e.key === "99" ||
		e.key === "100" ||
		e.key === "101" ||
		e.key === "102" ||
		e.key === "103" ||
		e.key === "104" ||
		e.key === "105" ||
		e.key === "110"
	) {
		addNumber(e.key);
		displayNum();
	}
	else if (e.key === "+" || e.key === "-" || e.key === "/") {
		operationSelection(e.key);
		displayNum();
	}
	else if (e.key === "*") {
		operationSelection(e.key);
		displayNum();
	}
	else if (e.key == "Enter" || e.key === "=") {
		calculatorOperation(e.key);
		console.log(e.key)
		displayNum();
	}
	else if (e.key == "Backspace") {
		deleteOperand(e.key);
		displayNum();
	}
	else if (e.key == "Delete" || e.key === "46") {
		reset();
		displayNum();
	}
});
toggleBtn.forEach(btn => {
	btn.addEventListener("click", () => {
		themeChange(btn.value);
	});
})
function themeChange(i) {
	if (i === "0") {
		body.classList.remove('theme1', 'theme2');
		body.classList.add('default');
		localStorage.setItem("theme", "default");
	} else if (i === "1") {
		body.classList.remove('theme2', 'default');
		body.classList.add('theme1');
		localStorage.setItem("theme", "theme1");
	} else if (i === "2") {
		body.classList.remove('theme1', 'default');
		body.classList.add('theme2');
		localStorage.setItem("theme", "theme2");
	}
}
if (selectedTheme === 'default') {
	document.body.classList.add('default')
	toggleBtn[0].checked = true
} else if (selectedTheme === 'theme1') {
	document.body.classList.add('theme1')
	toggleBtn[1].checked = 'true'
} else if (selectedTheme === 'theme2') {
	document.body.classList.add('theme2')
	toggleBtn[2].checked = 'true'
}