export const styles = {
    FILLED_RECT: "filled-rectangle",
    HOLLOW_RECT: "hollow-rectangle",
    ALTERNATE_RECT: "alternating-rectangle",
    SPACED_ALT_RECT: "spaced-alternating-rectangle",
    TRIANGLE: "triangle",
    RIGHT_TRIANGLE: "right-aligned-triangle",
    DIAMOND: "diamond",
    HOLLOW_DIAMOND: "hollow-diamond",
};

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

export function generatePattern(style, dimensions) {
    const cols = dimensions[0];
    const rows = dimensions[1];

    if (isZero(cols) || isZero(rows)) {
        return "";
    }

    switch (style) {
        case styles.FILLED_RECT:
            return rectangle(cols, rows).join("\n");
        case styles.HOLLOW_RECT:
            return hollowRectangle(cols, rows).join("\n");
        case styles.ALTERNATE_RECT:
            return alternatingRectangle(cols, rows).join("\n");
        case styles.SPACED_ALT_RECT:
            return spacedAlternatingRec(cols, rows).join("\n");
        case styles.TRIANGLE:
            return triangle(dimensions).join("\n");
        case styles.RIGHT_TRIANGLE:
            return rightTriangle(dimensions).join("\n");
        case styles.DIAMOND:
            return diamond(dimensions).join("\n");
        default:
            return "Invalid Style";
    }
}
