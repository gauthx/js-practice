import { brightRed } from "jsr:@std/fmt/colors";

function padToFourDigits(digits) {
  for (let index = 0; index < (4 - digits.length); index++) {
    digits.unshift(0);
  }
  return digits;
}

function toDigits(number) {
  const digits = [];
  while (number !== 0) {
    const digit = number % 10;
    digits.push(digit);
    number = (number - digit) / 10;
  }

  return padToFourDigits(digits);
}

const formNumber = (digits) => {
  return digits.reduce((num, digit) => num * 10 + digit, 0);
};

function formLargestNum(digits) {
  const largest = digits.toSorted((a, b) => b - a);
  return formNumber(largest);
}

function formSmallestNum(digits) {
  const smallest = digits.toSorted((a, b) => a - b);
  return formNumber(smallest);
}

function areAllDigitsSame(digits) {
  const [firstDigit] = digits;
  return digits.every((digit) => digit === firstDigit);
}

const isNot4digitNum = (digits) => digits.length !== 4;

const isInvalidNum = (num) => {
  const digits = toDigits(num);
  if (areAllDigitsSame(digits)) {
    console.log(
      brightRed(`${num} doesn't have atleast two unique digits.\n`),
    );
    return true;
  }

  if (isNot4digitNum(digits)) {
    console.log(
      brightRed(`${num} is not a 4 digit number.\n`),
    );
    return true;
  }
    
  return false;
};

function kaprekarsRoutine(number) {
  const kaprekarConstant = 6174;
  let candidateNum = number;

  if (isInvalidNum(number)) {
    return;
  }

  let iteration = 0;
  while (candidateNum !== kaprekarConstant) {
    const digits = toDigits(candidateNum);
    const largest = formLargestNum(digits);
    const smallest = formSmallestNum(digits);
    const difference = largest - smallest;
    console.log(`${largest} - ${smallest} = ${difference}`);
    candidateNum = difference;
    iteration++;
  }
  console.log(`${number} took ${iteration} iterations to reach 6174\n`);
}

const displayOptions = () => {
  console.log(`Options available
1. For a single number
2. Numbers between a range
3. Exit`);
};

const kaprekarsRoutineBetweenARange = (start, end) => {
  for (let number = start; number <= end; number++) {
    kaprekarsRoutine(number);
  }
};

const OPTION_HANDLERS = {
  1: () => {
    const number = parseInt(prompt("Enter the number: "));
    kaprekarsRoutine(number);
  },
  2: () => {
    const range = prompt("Enter start,end separated by a space: ");
    const [start, end] = range.split(" ").map((num) => Number(num));
    kaprekarsRoutineBetweenARange(start, end);
  },
  3: () => {
    console.log("Exitting..");
  },
};

const handleOption = (option) => {
  if (!(option in OPTION_HANDLERS)) {
    console.error("Invalid option");
    return;
  }
  OPTION_HANDLERS[option]();
};

const isExit = (option) => option === 3;

export const chooseOption = () => {
  let option;

  while (!isExit(option)) {
    displayOptions();
    option = parseInt(prompt("Enter your option: "));
    handleOption(option);
  }
};
