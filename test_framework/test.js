const multiply = (a, b) => a * b;

const dbg = function (x) {
  console.log(x);
  return x;
};

function testFn(message, fn, args, expectedValue) {
  const actualValue = fn(...args);
  const isPass = actualValue === expectedValue;
  let emojiMessage = isPass ? "✅" : "❌";
  emojiMessage += message;
  const inputMessage = isPass ? "" : `\n  Inputs\t:[${args}]`;
  const expectedMessage = isPass ? "" : `  Expected\t: ${expectedValue}`;
  const actualMessage = isPass ? "" : `\n  Actual\t: ${actualValue}`;
  console.log(emojiMessage, inputMessage);
  console.log(expectedMessage, actualMessage);
}

function testAll() {
  const testCases = [{
    desc: "description",
    fn: multiply,
    args: [3, 5],
    expected: 12,
  }];

  testCases.forEach((testCase) =>
    testFn(testCase.desc, testCase.fn, testCase.args, testCase.expected)
  );
}

testAll();
