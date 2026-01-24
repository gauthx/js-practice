const areSameletters = (letter1, letter2) =>
  letter1.toLowerCase() === letter2.toLowerCase();

const fillDashes = (dashes, word, guessedLetter) => {
  const filledDashes = [...dashes];
  for (let index = 0; index < word.length; index++) {
    const letter = word[index];
    if (areSameletters(letter, guessedLetter)) {
      filledDashes[index] = letter;
    }
  }
  return filledDashes.join("");
};

const isHangmanSolved = (dashes, word) => dashes === word;

const main = () => {
  const word = "dictionary";
  let dashes = Array.from([...word], () => "_");
  console.log({ word, dashes });

  console.log(dashes.join(""));
  while (!isHangmanSolved(dashes, word)) {
    const guessedLetter = prompt("Enter guess: ");
    if (word.includes(guessedLetter)) {
      dashes = fillDashes(dashes, word, guessedLetter);
      console.log(dashes);
    }
  }
};

main();
