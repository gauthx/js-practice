function displayGameDescription() {
  console.log(`🔐 
Game description:
1.The password is 4 digits
2.Each digit consists of either 1 or 2 or 3 or 4 `)

}

function sumOfSpecificDigits(secretCode, positonOfDigits) {
  let sum = 0;
  for (let index = 0; index < positonOfDigits.length; index++) {
    const indexOfSecretCode = positonOfDigits[index];
    sum += parseInt(secretCode[indexOfSecretCode],10);
  }
  return sum;
}

function displayClue(secretCode, tries) {
  switch (tries) {
    case 3:
      const sumOfAllDigits = sumOfSpecificDigits(secretCode, [0, 1, 2, 3]);
      console.log("Sum of all digits is ", sumOfAllDigits);
      break;
    case 6:
      const sumOfFirstAndLast = sumOfSpecificDigits(secretCode, [0, 3]);
      console.log("Sum of first and last digit is", sumOfFirstAndLast);
      break;
    case 9:
      const sumOfSecAndThird = sumOfSpecificDigits(secretCode, [1, 2]);
      console.log("Sum of second and third digit is", sumOfSecAndThird);
      break;

  }
}

function generateSecretCode() {
  const high = 4;
  const low = 0;
  let secretCode = "";
  for (let index = 0; index < 4; index++) {
    const digit = Math.floor(Math.random() * (high - low) + low + 1);
    secretCode += digit;
  }
  return secretCode;
}

function main() {
  displayGameDescription();
  const codeToCrack = generateSecretCode();
  //console.log(codeToCrack);
  let tries = 0;

  let isGuessCorrect = false;

  while (!isGuessCorrect) {
    "—".repeat(15);
    displayClue(codeToCrack, tries);
    
    const userInput = prompt("Guess the code:");
    tries++;
    isGuessCorrect = userInput === codeToCrack;
  }

  console.log("U won");

}

main();
