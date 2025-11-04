function meanOf(data) {
  let sum = 0;
  for (let index = 0; index < data.length; index++) {
    sum = sum + data[index];
  }

  return sum / data.length;
}

function standardDeviation(data) {
  const mean = meanOf(data);
  let varianceSum = 0;

  for (let index = 0; index < data.length; index++) {
    const datapoint = data[index];
    const variance = datapoint - mean;
    varianceSum = varianceSum + variance * variance;
  }

  return Math.sqrt(varianceSum / data.length);
}

function testStdDeviation(message, data, expectedValue) {
  const actualValue = standardDeviation(data);
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
  console.log("Testing Standard Deviation");
  console.log("-".repeat(26));
  testStdDeviation("[3,1,2]", [3, 1, 2], Math.sqrt(2 / 3));
}

testAll();
