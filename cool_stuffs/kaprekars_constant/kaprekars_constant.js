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

function hasAtleastTwoDiffDigits(digits) {
    const [firstDigit] = digits;
    return digits.every((digit) => digit === firstDigit);
}

const isNot4digitNum = (digits) => digits.length !== 4;

const isInvalidNum = (num) => {
    const digits = toDigits(num);
    return !hasAtleastTwoDiffDigits(digits) || isNot4digitNum(digits);
};

function noOfIterationsTook(number) {
    const kaprekarConstant = 6174;

    let kaprekarNumCandidate = number;

    if (isInvalidNum(number)) {
        console.log(
            kaprekarNumCandidate,
            " doesn't have atleast two unique digits",
        );
        return;
    }

    let iterationCount = 0;
    while (kaprekarNumCandidate !== kaprekarConstant) {
        const digits = toDigits(kaprekarNumCandidate);
        const largest = formLargestNum(digits);
        const smallest = formSmallestNum(digits);
        const result = largest - smallest;
        console.log(`${largest} - ${smallest} = ${result}`);
        kaprekarNumCandidate = result;
        iterationCount++;
    }
    console.log(`${number} took ${iterationCount} iterations to reach 6174`);
}

const displayDescription = () => {
    const kaprekarDescription = `
About Kaprekar's Constant

Kaprekar's constant is the number 6174, discovered by the Indian mathematician D. R. Kaprekar.
It has a fascinating property:

1. Take any 4-digit number (with at least two different digits).
2. Rearrange its digits to form the largest and smallest possible numbers.
3. Subtract the smaller number from the larger one.
4. Repeat the process with the result.

No matter which valid number you start with, you will always reach 6174 in a finite number of steps—and once you reach 6174, the process loops forever (7641 − 1467 = 6174).

This iterative process is known as Kaprekar's routine, and 6174 is the unique fixed point for 4-digit numbers.
`;

    console.log(kaprekarDescription);
};

const displayOptions = () => {
    console.log(`1. For a single number
        2. Numbers between a range
        3. Exit`);
};
function main() {
    displayDescription();
    let option = null;

    while (option !== 3) {
        displayOptions();
        option = parseInt(prompt("Enter your option: "));
        switch (option) {
            case 1:
                const number = parseInt(prompt("Enter the number"));
                noOfIterationsTook(number);
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                console.log("Invalid option!");
        }
    }
}

main();
