import { red } from "jsr:@std/fmt/colors";

const underline = (count) => console.log("-".repeat(count));

export const displayGameDescription = () => {
  underline(40);

  console.log(`Welcome to the Last Coin Standing Game!🪙
This is a two player game.
Your objective is ${red("not")} to take the last coin.
There will be a pile of coins. On each player's turn you can pick a handful of coins and it will get subtracted from the pile.
Game rule:
1.You can't take more than 3 or less than 1 coins in a turn`);

  underline(40);
};
