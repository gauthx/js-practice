const main = () => {
  const numbers = [5, 1, 2, 3, 1.6, 1.5, -1, -2];
  const sorted = [];
  console.log(`before sort- ${numbers}`);

  for (const number of numbers) {
    setTimeout(() => {
      console.log(number);
      sorted.push(number);
      console.log(sorted);
    }, number * 600);
  }
};

main();
