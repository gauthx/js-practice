export const createScreen = (height, width) => {
  return {
    height,
    width,
    pixels: Array.from(
      { length: height },
      () => Array.from({ length: width }, () => " "),
    ),
  };
};

export const displayScreen = (screen) => {
  console.log(screen.pixels.map((line) => line.join("")).join("\n"));
};

export const clearScreen = (screen) => {
  for (let i = 0; i < screen.height; i++) {
    for (let j = 0; j < screen.width; j++) {
      screen.pixels[i][j] = " ";
    }
  }
};

export const putCharAt = (y, x, char, screen) => {
  if (isOutsideRange(x, screen.height) || isOutsideRange(y, screen.width)) {
    return;
  }
  screen.pixels[y][x] = char;
  console.log(screen)
};

const isOutsideRange=(x, end) => {
  return x < 0 || x >= end;
}

