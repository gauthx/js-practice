const sortDescending = (numbers) => {
  return numbers.sort((a, b) => b - a);
};

const customOrder = (numbers) => {
  const evenAscending = numbers.filter(num => num % 2 === 0).sort((a, b) => a - b);
  const oddDescending = numbers.filter(num => num % 2 === 1).sort((a, b) => b - a);

  evenAscending.push(...oddDescending);
  
  return evenAscending;
};