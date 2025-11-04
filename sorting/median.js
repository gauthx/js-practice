function sort(data) {
  const sorted = data.slice();
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      if (sorted[j] < sorted[i]) {
        const temp = sorted[j];
        sorted[j] = sorted[i];
        sorted[i] = temp
      }
    }
  }

  return sorted;
}

function medianOf(data) {
  const sorted = sort(data);
  const middleIndex = (sorted.length - 1) / 2;
  const ceiledIndex = Math.ceil(middleIndex);
  const flooredIndex = Math.floor(middleIndex);

  return (sorted[ceiledIndex] + sorted[flooredIndex]) / 2;
}

function testMedian(message, data, expectedValue) {
  const actualValue = medianOf(data);
  const isPass = actualValue === expectedValue;
  let emojiMessage = isPass ? "✅" : "❌";
  emojiMessage += message;

  const inputMessage = isPass ? '' : `\n  Inputs\t:[${data}]`;
  const expectedMessage = isPass ? '' : `  Expected\t: ${expectedValue}`;
  const actualMessage = isPass ? '' : `\n  Actual\t: ${actualValue}`;
  console.log(emojiMessage, inputMessage);
  console.log(expectedMessage, actualMessage);
}

function testAll() {
  console.log("Testing Median");
  console.log("-".repeat(15));
  testMedian("Odd length array", [3, 1, 2], 2);
  testMedian("Even length array", [1, 2, 3, 4], 2.5);
}

testAll();
