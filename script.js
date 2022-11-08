'use strict';

const passLength = document.getElementById('length');
const lengthInput = document.getElementById('length-input');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const passwordDisplay = document.querySelector('.pass');
const generateBtn = document.querySelector('.generate-btn');
const level = document.querySelector('.level span');
const levelIndicators = document.getElementById('level-indicators');
const copyText = document.querySelector('.copy');

let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let lower = upper.toLowerCase();
let numbers = '0123456789';
let symbols = '~!@#$%^&*';

const generateRandNum = function (num) {
	const number = Math.trunc(Math.random() * num);
	return number;
};

lengthInput.addEventListener('input', function () {
	passLength.textContent = this.value;
});

const generatePassword = function (len) {
	let password = '';

	while (password.length < len) {
		if (uppercaseEl.checked && password.length < len) {
			password += upper[generateRandNum(upper.length)];
		}

		if (lowercaseEl.checked && password.length < len) {
			password += lower[generateRandNum(lower.length)];
		}

		if (numbersEl.checked && password.length < len) {
			password += numbers[generateRandNum(numbers.length)];
		}

		if (symbolsEl.checked && password.length < len) {
			password += numbers[generateRandNum(symbols.length)];
		}
	}
	return password;
};

generateBtn.addEventListener('click', function () {
	passwordDisplay.textContent = generatePassword(lengthInput.value);
	level.textContent = checkStrength();
	levelIndicators.classList = checkStrength();
});

const checkStrength = function () {
	const checked = [...document.querySelectorAll('input:checked')].map(
		e => e.value
	);
	console.log(checked);
	if (lengthInput.value < 8) return 'easy';
	else if (lengthInput.value >= 8 && checked.length == 1) return 'easy';
	else if (lengthInput.value >= 8 && checked.length > 1 && checked.length < 4)
		return 'medium';
	else if (lengthInput.value >= 8 && checked.length == 4) return 'hard';
};

const copyPassword = function () {
	let text = passwordDisplay.textContent;
	navigator.clipboard.writeText(text);
};

copyText.addEventListener('click', copyPassword);
