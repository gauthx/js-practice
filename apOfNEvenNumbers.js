const countOfN = 5;
let currentEvenNumber = 0;
let counterForN = 1;
let sumOfEvenNumbers = 0;

while (counterForN <= countOfN) {
    sumOfEvenNumbers = sumOfEvenNumbers + currentEvenNumber;
    currentEvenNumber = currentEvenNumber + 2;
    counterForN = counterForN + 1;
}

console.log("Sum of first", countOfN, "even numbers is :", sumOfEvenNumbers);
