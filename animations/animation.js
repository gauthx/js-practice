import {
  clearScreen,
  createScreen,
  displayScreen,
  putCharAt,
} from "./screen.js";

const putTextOn = (screen, { x, y, text }) => {
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    putCharAt(y, x, char, screen);
    x += 1;
  }
};

const drawObjects = (screen) => {
  displayScreen(screen);
  clearScreen(screen);
};

const updateObjects = (objects, screen) => {
  const greeting = objects;
  putTextOn(screen, greeting);
  greeting.x += 1;
};

const main = () => {
  const screen = createScreen(10, 10);
  const greeting = { x: 0, y: 0, text: "namaskar" };

  drawObjects(screen);

  setInterval(() => {
    updateObjects(greeting, screen);
    drawObjects(screen);
  }, 1000);
};

main();
