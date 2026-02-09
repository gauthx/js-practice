import { input } from "npm:@inquirer/prompts";
import { Players } from "./players.js";

class CoinPile {
  constructor(coins) {
    this.totalCoins = coins;
  }

  isValidInput(input) {
    const requested = Number(input);

    const maximumPossible = 3;
    const isOutOfRange = this.totalCoins < requested ||
      requested > maximumPossible ||
      requested < 1 || (this.totalCoins - requested) <= 0;

    const isValid = !isNaN(requested) && Number.isInteger(requested) &&
      !isOutOfRange;

    return isValid ? true : "Invalid input! Please take again"; // inquirer mehhhh
  }

  is1CoinLeft() {
    return this.totalCoins === 1;
  }

  async takeCoins(playerName) {
    const requestedCoins = await input({
      message: `${playerName}'s turn: `,
      required: true,
      validate: this.isValidInput.bind(this),
    });

    this.totalCoins -= parseInt(requestedCoins);
  }

  displayCoins() {
    console.log("Total no. of coins🌕", this.totalCoins);
  }
}

const readPlayerName = async (plyrPlaceHolder) =>
  await input({
    message: `Enter ${plyrPlaceHolder}'s name: `,
    default: plyrPlaceHolder,
    prefill: "tab",
    required: true,
  });

const randomNumBetween = (low, high) =>
  Math.floor(Math.random() * (high - low) + low + 1);

export const playGame = async () => {
  const player1 = await readPlayerName("player1");
  const player2 = await readPlayerName("player2");

  const players = new Players(player1, player2);
  const totalCoins = randomNumBetween(10, 20);
  const pile = new CoinPile(totalCoins);

  while (true) {
    pile.displayCoins();
    await pile.takeCoins(players.currentPlayer());

    if (pile.is1CoinLeft()) {
      console.log(players.currentPlayer(), "won");
      break;
    }

    players.switchPlayer();
  }
};
