function underline(count) {
  console.log("-".repeat(count));
}

function format(code, text) {
  return `\x1B[${code}m${text}\x1B[0m`;
}

function bold(text) {
  return format(1, text);
}

function magenta(text) {
  return format(35, text);
}

function yellow(text) {
  return format(33, text);
}

function red(text) {
  return format(31, text)
}

function isGameOver(total) {
  return total === 1;
}

function displayCoins(totalCoins) {
  console.log("Total no. of coins🌕", totalCoins);
}

function isInvalidInput(input, total) {
  const isNaN = input + "" === "NaN";
  const isInvalidType = typeof input !== "number";
  const isNotInRange = input >= total || input > 3;

  return isNaN || isInvalidType || isNotInRange;
}

function takeCoins(total, player, colorNumber) {
  const coloredText = colorNumber === 1 ? magenta(`${player}'s turn :`) : yellow(`${player}'s turn :`);
  const input = parseInt(prompt(coloredText), 10);
  const isInvalid = isInvalidInput(input, total);

  if (isInvalid) {
    console.log("Invalid input❌\nPlease retake ♻️!");
    underline(30);
    return takeCoins(total, player, colorNumber);
  }

  underline(30);
  return total - input;
}

function displayGameDescription() {
  underline(40);
  const redText = red("not");

  console.log(`Welcome to the Last Coin Standing Game!🪙
Your objective is ${redText} to take the last coin
Game rule:
1.You can't take more than 3 or less than 1 coins in a turn`);
  underline(40);
}

function playGame() {
  const high = 30;
  const low = 20;
  let totalCoins = Math.floor(Math.random() * (high - low) + low + 1);

  const player1 = prompt("Enter player1's name: ");
  const player2 = prompt("Enter player2's name: ");

  while (true) {
    displayCoins(totalCoins);
    totalCoins = takeCoins(totalCoins, player1, 1);
    if (isGameOver(totalCoins)) {
      console.log(`${player2} lost 😂`);
      return;
    }

    displayCoins(totalCoins);
    totalCoins = takeCoins(totalCoins, player2, 2);
    if (isGameOver(totalCoins)) {
      console.log(`${player1} lost 😂`);
      return;
    }
  }
}

function main() {
  displayGameDescription();
  playGame();
}

main();
