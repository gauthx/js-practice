const clearScreen = (screen) => {
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[i].length; j++) {
      screen[i][j] = "-";
    }
  }
};

const printScreen = (screen) => {
  let horizontal = "";
  for (let index = 0; index < 2; index++) {
    horizontal += screen[index].join("") + "\n";
  }

  let vertical = "";
  vertical += toVertical(screen[2].join(""));
  console.log(horizontal)
  console.log(vertical);
};

const drawScreen = (x, y, screen, text) => {
  screen[x][y] = text;
};

const toVertical = (string) => {
  return string.split("").map((str) => `   ${str}`).join("\n");
};

const pad = () => {
  
}

const main = () => {
  const screen = [
    " ".repeat(10).split(""),
    " ".repeat(10).split(""),
    " ".repeat(10).split(""),
  ];
  const textToDraw = "BREAKING NEWS";

  const x1 = 0;
  const x2 = 1;
  const x3 = 2;

  let y1 = 0;
  let y2 = 0;
  let y3 = 0;
  setInterval(() => {
    console.clear();
    drawScreen(x1, y1, screen, "foo");
    // drawScreen(x2, y2, screen, "bar");
    // drawScreen(x3, y3, screen, "vertical");
    printScreen(screen);
    clearScreen(screen);
    y1 = (y1 + 1) % 10;
    y2 = y2 === 0 ? 10 : y2 - 1;
    y3 = (y3 + 1) % 10;
  }, 500);
};

main();
