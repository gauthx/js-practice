const FILLED_RECT = "filled-rectangle";
const HOLLOW_RECT = "hollow-rectangle";
const ALTERNATE_RECT = "alternating-rectangle";
const SPACED_ALT_RECT = "spaced-alternating-rectangle";
const TRIANGLE = "triangle";
const RIGHT_TRIANGLE = "right-aligned-triangle";
const DIAMOND = "diamond";
const HOLLOW_DIAMOND = "hollow-diamond";

function isZero(dimension) {
    return dimension === 0;
}

function generateLine(length, middle = "*", char = "*") {
    if (length <= 2) {
        return char.repeat(length);
    }
    return char + middle.repeat(length - 2) + char;
}

function rectangle(cols, rows) {
    const pattern = [];

    for (let rowNo = 0; rowNo < rows; rowNo++) {
        const row = generateLine(cols);
        pattern.push(row);
    }

    return pattern;
}

function hollowRectangle(cols, rows) {
    const pattern = [];

    pattern.push(generateLine(cols));
    for (let rowNo = 0; rowNo < rows - 2; rowNo++) {
        const row = generateLine(cols, " ");
        pattern.push(row);
    }
    pattern.push(generateLine(cols));

    return pattern;
}

function chooseChar(index, divisor) {
    const chars = ["*", "-", " "];

    return chars[index % divisor];
}

function alternatingRectangle(cols, rows) {
    const pattern = [];

    for (let rowNo = 0; rowNo < rows; rowNo++) {
        const char = chooseChar(rowNo, 2);
        const row = generateLine(cols, char, char);

        pattern.push(row);
    }

    return pattern;
}

function spacedAlternatingRec(cols, rows) {
    const pattern = [];

    for (let rowNo = 0; rowNo < rows; rowNo++) {
        const char = chooseChar(rowNo, 3);
        const row = generateLine(cols, char, char);

        pattern.push(row);
    }

    return pattern;
}

function triangle(rows) {
    const pattern = [];

    for (let rowNo = 1; rowNo <= rows; rowNo++) {
        const row = generateLine(rowNo);
        pattern.push(row);
    }

    return pattern;

}

function rightTriangle(rows) {
    const pattern = [];

    for (let rowNo = 1; rowNo <= rows; rowNo++) {
        const row = generateLine(rows - rowNo, " ", " ") + generateLine(rowNo);
        pattern.push(row);
    }

    return pattern;

}

function diamond(rows) {
    const pattern = [];
    const closestOdd = rows % 2 === 0 ? rows - 1 : rows;

    

    return pattern;
}

function generatePattern(style, dimensions) {
    const cols = dimensions[0];
    const rows = dimensions[1];

    if (isZero(cols) || isZero(rows)) {
        return "";
    }

    switch (style) {
        case FILLED_RECT:
            return rectangle(cols, rows).join("\n");
        case HOLLOW_RECT:
            return hollowRectangle(cols, rows).join("\n");
        case ALTERNATE_RECT:
            return alternatingRectangle(cols, rows).join("\n");
        case SPACED_ALT_RECT:
            return spacedAlternatingRec(cols, rows).join("\n");
        case TRIANGLE:
            return triangle(dimensions).join("\n");
        case RIGHT_TRIANGLE:
            return rightTriangle(dimensions).join("\n");
        case DIAMOND:
            return diamond(dimensions).join("\n");
        default:
            return "Invalid Style";
    }
}

function testPattern(message, style, dimensions, expectedValue) {
    const actualValue = generatePattern(style, dimensions);
    const isPass = actualValue === expectedValue;
    let emojiMessage = isPass ? "✅" : "❌";
    emojiMessage += message;

    const inputMessage = isPass ? '' : `\n  Inputs\t:[${style},${dimensions}]`;
    const expectedMessage = isPass ? '' : `  Expected\t: \n${expectedValue}`;
    const actualMessage = isPass ? '' : `\n  Actual\t:\n${actualValue}`;
    console.log(emojiMessage, inputMessage);
    console.log(expectedMessage, actualMessage);
}

function testRectangle() {
    let expectedPattern = "**\n**\n**\n**";
    testPattern(" 2 x 4 rectangle", FILLED_RECT, [2, 4], expectedPattern);

    expectedPattern = "*****\n*****\n*****";
    testPattern(" 5 x 3 rectangle", FILLED_RECT, [5, 3], expectedPattern);

    expectedPattern = "";
    testPattern(" 0 x 1", FILLED_RECT, [0, 1], expectedPattern);
}

function testHollowRectangle() {
    testPattern("0x3 Hrectangle", HOLLOW_RECT, [0, 3], "");

    let expectedPattern = "****\n*  *\n****";
    testPattern("4x3 Hrectangle", HOLLOW_RECT, [4, 3], expectedPattern);

    expectedPattern = "***\n***";
    testPattern("3x2 Hrectangle", HOLLOW_RECT, [3, 2], expectedPattern);

    expectedPattern = "*\n*\n*\n*\n*";
    testPattern("1x5 Hrectangle", HOLLOW_RECT, [1, 5], expectedPattern);
}

function testAlternatingRectangle() {
    let message = "3 x 3 Alternating Rectangle";
    let expectedPattern = "***\n---\n***";
    testPattern(message, ALTERNATE_RECT, [3, 3], expectedPattern);

    message = "4 x 1 Alternating Rectangle";
    expectedPattern = "****";
    testPattern(message, ALTERNATE_RECT, [4, 1], expectedPattern);
}

function testSpacedAlternating() {
    let message = "0 x 3 Spaced Alternating Rectangle";
    let expectedPattern = "";
    testPattern(message, SPACED_ALT_RECT, [0, 3], expectedPattern);

    message = "3 x 5 Spaced Alternating Rectangle";
    expectedPattern = "***\n---\n   \n***\n---";
    testPattern(message, SPACED_ALT_RECT, [3, 5], expectedPattern);

    message = "1 x 3 Spaced Alternating Rectangle";
    expectedPattern = "*\n-\n ";
    testPattern(message, SPACED_ALT_RECT, [1, 3], expectedPattern);

    message = "4 x 1 Spaced Alternating Rectangle";
    expectedPattern = "****";
    testPattern(message, SPACED_ALT_RECT, [4, 1], expectedPattern);

    message = "4 x 2 Spaced Alternating Rectangle";
    expectedPattern = "****\n----";
    testPattern(message, SPACED_ALT_RECT, [4, 2], expectedPattern);
}

function testRightTriangle() {
    let message = "5 rows right aligned triangle";
    let expectedPattern = "    *\n   **\n  ***\n ****\n*****";
    testPattern(message, RIGHT_TRIANGLE, 5, expectedPattern);

    message = "0 row right aligned triangle";
    expectedPattern = "";
    testPattern(message, RIGHT_TRIANGLE, 0, expectedPattern);

    message = "1 row right aligned triangle";
    expectedPattern = "*";
    testPattern(message, RIGHT_TRIANGLE, 1, expectedPattern);
}

function testTriangle() {
    let message = "5 rows triangle";
    let expectedPattern = "*\n**\n***\n****\n*****";
    testPattern(message, TRIANGLE, 5, expectedPattern);

    message = "1 row triangle";
    expectedPattern = "*";
    testPattern(message, TRIANGLE, 1, expectedPattern);

    message = "0 row triangle";
    expectedPattern = "";
    testPattern(message, TRIANGLE, 0, expectedPattern);
}

function testDiamond() {
    let message = "5 rows 💎";
    let expectedPattern = "  *  \n *** \n******\n *** \n  *  ";
    testPattern(message, DIAMOND, 5, expectedPattern);
}

function testAll() {
    testRectangle();
    testHollowRectangle();
    testAlternatingRectangle();
    testSpacedAlternating();
    testTriangle();
    testRightTriangle();
    testDiamond();
    
}

testAll();
