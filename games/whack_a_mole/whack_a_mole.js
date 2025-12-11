const randomNumBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const displayHoles = () => {
  console.log("🕳️ ".repeat(3));
};

const displayMole = (position) => {
  console.log(`${" ".repeat(position * 2)}🦡`);
};

const main = () => {
  const intervalId = setInterval(() => {
    const randomNum = randomNumBetween(0, 2);
    displayMole(randomNum);
    displayHoles();
    const holeNum = parseInt(prompt("EN"));
    if (holeNum === 1) {
      clearInterval(intervalId);
    }
  }, 500);
};

main();
