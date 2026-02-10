import { hangmanArts } from "../data/hangman_arts.js";
import { input } from "@inquirer/prompts";

const isCorrectLetter = (letter1, letter2) =>
  letter1.toLowerCase() === letter2.toLowerCase();

const fillDashes = (dashes, targetWord, guessedLetter) => {
  const filledDashes = [...dashes];

  for (let index = 0; index < targetWord.length; index++) {
    const targetLetter = targetWord[index];

    if (isCorrectLetter(targetLetter, guessedLetter)) {
      filledDashes[index] = targetLetter;
    }
  }

  return filledDashes.join("");
};

const isHangmanSolved = (dashes, word) => dashes === word;

const isHangmanDead = (tries) => tries === 6;

export const startGame = async () => {
  const word = "dictionary";
  let dashes = Array.from([...word], () => "_").join("");
  let tries = 0;

  while (true) {
    console.clear();
    console.log(hangmanArts[tries], "\n\n");
    console.log("Fill the below dashes\n", dashes);

    if (isHangmanDead(tries)) {
      console.log("You lost\nThe word was", word);
      break;
    }

    if (isHangmanSolved(dashes, word)) {
      console.log("You won!");
      break;
    }

    const guessedLetter = await input({
      message: "Guess a letter",
      required: true,
    });

    if (word.includes(guessedLetter)) {
      dashes = fillDashes(dashes, word, guessedLetter);
    } else {
      tries++;
    }
  }
};
