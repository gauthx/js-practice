import { generatePattern, styles } from "./patterns.js";

function testPattern(message, fn, args, expectedValue) {
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

const testFn = (testCases) => {
  testCases.forEach((testCase) =>
    testPattern(testCase.desc, testCase.fn, testCase.args, testCase.expected)
  );
};

function testRectangle() {
  const testCases = [{
    desc: "2 x 4 rectangle",
    fn: generatePattern,
    args: [styles.FILLED_RECT, [2, 4]],
    expected: "**\n**\n**\n**",
  }, {
    desc: " 5 x 3 rectangle",
    fn: generatePattern,
    args: [styles.FILLED_RECT, [5, 3]],
    expected: "*****\n*****\n*****",
  }, {
    desc: " 0 x 1 rectangle",
    fn: generatePattern,
    args: [styles.FILLED_RECT, [0, 1]],
    expected: "",
  }];

  testFn(testCases);
}

function testHollowRectangle() {
  const testCases = [{
    desc: "0x3 Hrectangle",
    fn: generatePattern,
    args: [styles.HOLLOW_RECT, [0, 3]],
    expected: "",
  }, {
    desc: "4x3 Hrectangle",
    fn: generatePattern,
    args: [styles.HOLLOW_RECT, [4, 3]],
    expected: "****\n*  *\n****",
  }, {
    desc: "3x2 Hrectangle",
    fn: generatePattern,
    args: [styles.HOLLOW_RECT, [3, 2]],
    expected: "***\n***",
  }, {
    desc: "1x5 Hrectangle",
    fn: generatePattern,
    args: [styles.HOLLOW_RECT, [1, 5]],
    expected: "*\n*\n*\n*\n*",
  }];
  testFn(testCases);
}

function testAlternatingRectangle() {
  const testCases = [{
    desc: "3 x 3 Alternating Rectangle",
    fn: generatePattern,
    args: [styles.ALTERNATE_RECT, [3, 3]],
    expected: "***\n---\n***",
  }, {
    desc: "0 x 3 Alternating Rectangle",
    fn: generatePattern,
    args: [styles.ALTERNATE_RECT, [0, 3]],
    expected: "",
  }, {
    desc: "4 x 1 Alternating Rectangle",
    fn: generatePattern,
    args: [styles.ALTERNATE_RECT, [4, 1]],
    expected: "****",
  }];
  testFn(testCases);
}

function testSpacedAlternating() {
  const testCases = [{
    desc: "0 x 3 Spaced Alternating Rectangle",
    fn: generatePattern,
    args: [styles.SPACED_ALT_RECT, [0, 3]],
    expected: "",
  }, {
    desc: "3 x 5 Spaced Alternating Rectangle",
    fn: generatePattern,
    args: [styles.SPACED_ALT_RECT, [3, 5]],
    expected: "***\n---\n   \n***\n---",
  }, {
    desc: "1 x 3 Spaced Alternating Rectangle",
    fn: generatePattern,
    args: [styles.SPACED_ALT_RECT, [1, 3]],
    expected: "*\n-\n ",
  }, {
    desc: "4 x 1 Spaced Alternating Rectangle",
    fn: generatePattern,
    args: [styles.SPACED_ALT_RECT, [4, 1]],
    expected: "****",
  }, {
    desc: "4 x 2 Spaced Alternating Rectangle",
    fn: generatePattern,
    args: [styles.SPACED_ALT_RECT, [4, 2]],
    expected: "****\n----",
  }];
  testFn(testCases);
}

function testRightTriangle() {
  const testCases = [{
    desc: "5 rows right aligned triangle",
    fn: generatePattern,
    args: [styles.RIGHT_TRIANGLE, 5],
    expected: "    *\n   **\n  ***\n ****\n*****",
  }, {
    desc: "1 row right aligned triangle",
    fn: generatePattern,
    args: [styles.RIGHT_TRIANGLE, 1],
    expected: "*",
  }, {
    desc: "0 row right aligned triangle",
    fn: generatePattern,
    args: [styles.RIGHT_TRIANGLE, 0],
    expected: "",
  }];
  testFn(testCases);
}

function testTriangle() {
  const testCases = [{
    desc: "5 rows  triangle",
    fn: generatePattern,
    args: [styles.TRIANGLE, 5],
    expected: "*\n**\n***\n****\n*****",
  }, {
    desc: "1 row  triangle",
    fn: generatePattern,
    args: [styles.TRIANGLE, 1],
    expected: "*",
  }, {
    desc: "0 row triangle",
    fn: generatePattern,
    args: [styles.TRIANGLE, 0],
    expected: "",
  }];
  testFn(testCases);
}

function testDiamond() {
  const testCases = [{
    desc: "5 rows 💎",
    fn: generatePattern,
    args: [styles.DIAMOND, 5],
    expected: "  *  \n *** \n******\n *** \n  *  ",
  }];
}

function testAll() {
  testRectangle();
  testHollowRectangle();
  testAlternatingRectangle();
  testSpacedAlternating();
  testTriangle();
  testRightTriangle();
  // testDiamond();
}

testAll();
