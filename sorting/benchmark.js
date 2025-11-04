let count;

function sort(data) {
  const sorted = data.slice();

  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      count++;
      if (sorted[j] < sorted[i]) {
        const temp = sorted[j];
        sorted[j] = sorted[i];
        sorted[i] = temp
      }
    }
  }

  return sorted;
}

function randomNumBetween(low, high) {
  return low + Math.floor(Math.random() * (high - low));
}

function generateArray(noOfElements) {
  const array = [];
  for (let index = 0; index < noOfElements; index++) {
    const number = randomNumBetween(10, 20);
    array.push(number);
  }

  return array;
}

function benchmark(size) {
  count = 0;
  const data = generateArray(size);
  sort(data);
  console.log(`An array of ${data.length} length took ${count} no. of iterations to sort`);
}

function main() {
  benchmark(100);
  benchmark(200000);
}

main();
