const pickRandomChar = () => {
  const chars = ["$", "!", "*", "L", "K", "[", "|"];
  const max = chars.length;
  const randomIndex = Math.floor(Math.random() * max);
  return chars[randomIndex];
};

const createRandomChars = (size) => {
  const randomChars = [];
  for (let index = 0; index < size; index++) {
    randomChars.push(pickRandomChar());
  }

  return randomChars;
};

const createEmptySpaces = () => " ".repeat(10).split("");

const clearScreen = (screen) => {
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[i].length; j++) {
      screen[i][j] = " ";
    }
  }
};

const createDrawer = () => {
  let index = 0;
  return (screen) => {


  }
}

const displayScreen = (screen) => {
  let textToDisplay = "";
  for (let index = 0; index < screen.length; index++) {
    const row = screen[index];
    textToDisplay += row.map((char) => " ".repeat(index) + char).join("");
  }
  console.log(textToDisplay);
};

const main = () => {
  const screen = [createEmptySpaces(), createEmptySpaces()];
  const drawScreen = createDrawer();

  setInterval(() => {
    console.clear();
    drawScreen(screen)
    displayScreen(screen);
  }, 100);
};

main();
