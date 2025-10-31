function padToFourDigits(digits) {
    for (let index = 0; index < 4 - digits.length; index++) {
        digits.unshift(0)
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

function makeLargestNum(digits) {
    const largest = digits;

    for (let index = 0; index < largest.length - 1; index++) {
        for (let nextIndex = index + 1; nextIndex < largest.length; nextIndex++) {
            const element = largest[index];
            const nextElement = largest[nextIndex];

            if (nextElement > element) {
                largest[index] = nextElement;
                largest[nextIndex] = element;
            }
        }
    }

    return parseInt(largest.join(""));

}

function makeSmallestNum(digits) {
    const smallest = digits;

    for (let index = 0; index < smallest.length - 1; index++) {
        for (let nextIndex = index + 1; nextIndex < smallest.length; nextIndex++) {
            const element = smallest[index];
            const nextElement = smallest[nextIndex];

            if (nextElement < element) {
                smallest[index] = nextElement;
                smallest[nextIndex] = element;
            }
        }
    }

    return parseInt(smallest.join(""));

}

function hasAtleastTwoDiffDigits(digits) {
    let differentNumsFound = 0;
    for (let index = 0; index < digits.length - 1; index++) {
        const element = digits[index];
        const nextElement = digits[index + 1];

        if (element !== nextElement) {
            differentNumsFound++;
        }
    }

    return differentNumsFound >= 1;
}

function noOfIterationsTook(number) {
    const kaprekarConstant = 6174;

    let kaprekarNumCandidate = number;

    if (!hasAtleastTwoDiffDigits(toDigits(kaprekarNumCandidate))) {
        console.log(kaprekarNumCandidate, " doesn't have atleast two unique digits");
        return;
    }

    let iterationCount = 0;
    while (kaprekarNumCandidate !== kaprekarConstant) {
        const digits = toDigits(kaprekarNumCandidate);
        const largest = makeLargestNum(digits);
        const smallest = makeSmallestNum(digits);
        const result = largest - smallest;
        console.log(largest, "-", smallest, "=", result);
        kaprekarNumCandidate = result;
        iterationCount++;

    }

    console.log(`${number} took ${iterationCount} iterations to reach 6174`);


}
function main() {
    for (let number = 1234; number <= 9999; number++) {
        noOfIterationsTook(number);
    }
}

main();
