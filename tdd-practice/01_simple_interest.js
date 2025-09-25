function simpleInterest(p, t, r) {
  return p * t * r / 100;
}

function testSimpleInterest(expectedValue, p, t, r) {
  const actualValue = simpleInterest(p, t, r);
  const emojiMessage = actualValue === expectedValue ? "✅" : "❌";
  console.log(emojiMessage, " |", p, "  |", r, "    |", t, "    |", actualValue, "      |", expectedValue, "    |");
}

function testAll() {
  console.log("    |  p    |  r     |  t   |Actual value|Expected value |");
  testSimpleInterest(1000, 1000, 10, 10);
  testSimpleInterest(2000, 10000, 2, 10);
  testSimpleInterest(362.5, 2500, 7.25, 2,);
  testSimpleInterest(40.5, 500, 2.7, 3);
}

testAll();
