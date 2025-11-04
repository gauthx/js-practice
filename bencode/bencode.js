function isInteger(data) {
    return typeof data === "number";
}

function isString(data) {
    return typeof data === "string";
}

function encodeInteger(integer) {
    return `i${integer}e`;
}

function encodeString(string) {
    return `${string.length}:${string}`;
}

function encode(data) {
    if (Array.isArray(data)) {
        return encodeList(data, 0);
    }

    if (isInteger(data)) {
        return encodeInteger(data);
    }

    if (isString(data)) {
        return encodeString(data);
    }

}

function encodeList(list, index, bencodedString = "l") {
    if (index === list.length) {
        return bencodedString + "e";
    }

    const element = list[index];

    if (Array.isArray(element)) {
        const bencode = encodeList(element, 0);
        return encodeList(list, index + 1, bencodedString + bencode);
    }

    const bencode = encode(element);
    return encodeList(list, index + 1, bencodedString + bencode);
}

function testEncode(message, data, expectedValue) {
    const actualValue = encode(data);
    const isPass = actualValue === expectedValue;
    let emojiMessage = isPass ? "✅" : "❌";
    emojiMessage += message;

    const inputMessage = isPass ? '' : `\n  Inputs\t:[${data}]`;
    const expectedMessage = isPass ? '' : `  Expected\t: \n${expectedValue}`;
    const actualMessage = isPass ? '' : `\n  Actual\t:\n${actualValue}`;
    console.log(emojiMessage, inputMessage);
    console.log(expectedMessage, actualMessage);
}

function areArraysEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }

    for (let index = 0; index < array1.length; index++) {
        if (!areDeepEqual(array1[index], array2[index])) {
            return false;
        }
    }

    return true;
}

function areDeepEqual(array1, array2) {
    if (typeof array1 !== typeof array2) {
        return false;
    }

    if (Array.isArray(array1) && Array.isArray(array2)) {
        return areArraysEqual(array1, array2);
    }

    return array1 === array2;
}

function isBencodedInt(bencodedString, index = 0) {
    return bencodedString[index] === "i";
}

function isBenCodedString(bencodedString, index = 0) {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return numbers.includes(bencodedString[index]);
}

function decodeString(bencodedString, index = 0) {
    const lengthSeparatorIndex = bencodedString.indexOf(":", index);
    const stringLength = parseInt(bencodedString.slice(index, lengthSeparatorIndex));
    const stringEndIndex = lengthSeparatorIndex + stringLength;

    const string = bencodedString.slice(lengthSeparatorIndex + 1, stringEndIndex + 1);

    return [string, stringEndIndex];

}

function isEndOfArray(char) {
    return char === "e";
}

function isBencodedArray(bencodedString, index = 0) {
    return bencodedString[index] === "l";
}

function decodeInt(bencodedString, index = 0) {
    const integerInfo = [];

    const integerEndIndex = bencodedString.indexOf("e", index);
    const integer = parseInt(bencodedString.slice(index + 1, integerEndIndex));

    integerInfo.push(integer);
    integerInfo.push(integerEndIndex);

    return integerInfo;
}

function decodeElement(bencodedString, cursor) {
    if (isBenCodedString(bencodedString[cursor])) {
        return decodeString(bencodedString, cursor);
    }

    if (isBencodedInt(bencodedString[cursor])) {
        return decodeInt(bencodedString, cursor);
    }
}


function decodeArray(bencodedString, cursor, decoded) {
    if (isEndOfArray(bencodedString[cursor])) {
        return [decoded, cursor];
    }

    if (isBencodedArray(bencodedString[cursor])) {
        const subarray = decodeArray(bencodedString, cursor + 1, []);

        decoded.push(subarray[0]);
        cursor = subarray[1] + 1;

        return decodeArray(bencodedString, cursor, decoded);
    }

    const elementInfo = decodeElement(bencodedString, cursor);
    const element = elementInfo[0];
    decoded.push(element);

    cursor = elementInfo[1] + 1;

    return decodeArray(bencodedString, cursor, decoded);
}

function decodeArrayWrapper(bencodedString, cursor, array) {
    return decodeArray(bencodedString, cursor, array)[0];
}

function decode(bencodedString) {
    if (isBencodedArray(bencodedString)) {
        return decodeArrayWrapper(bencodedString, 1, []);
    }

    return decodeElement(bencodedString, 0)[0];
}

function testDecode(message, bencodedString, expectedValue) {
    const actualValue = decode(bencodedString);
    const isPass = areDeepEqual(actualValue, expectedValue);
    let emojiMessage = isPass ? "✅" : "❌";
    emojiMessage += message;

    const inputMessage = isPass ? '' : `\n  Inputs\t:[${bencodedString}]`;
    const expectedMessage = isPass ? '' : `  Expected\t: \n${expectedValue}`;
    const actualMessage = isPass ? '' : `\n  Actual\t:\n${actualValue}`;
    console.log(emojiMessage, inputMessage);
    console.log(expectedMessage, actualMessage);
}

function testAllEncode() {
    testEncode("Integer 1024", 1024, "i1024e");
    testEncode("Simple string", "hello", "5:hello");
    testEncode("Empty Array", [], "le");
    testEncode("Array containing integer and string element", [2025, "year"], "li2025e4:yeare");
    testEncode("Nested array", [91, ["India", "New Delhi"]], "li91el5:India9:New Delhiee");
    testEncode("Empty String", "", "0:");
    testEncode("Negative Number", -42, "i-42e");
    testEncode("Special characters", "special!@#$chars", "16:special!@#$chars");
}

function testAllDecode() {
    testDecode("Integer 1024", "i1024e", 1024);
    testDecode("Simple string", "5:hello", "hello");
    testDecode("Empty string", "0:", "");
    testDecode("Array containing Integer only", "li23ei12ee", [23, 12]);
    testDecode("Array containing String only", "l2:hi3:whye", ["hi", "why"]);
    testDecode("Array containing integer and string element", "li2025e4:yeare", [2025, "year"]);
    testDecode("Nested array", "li91el5:India9:New Delhiee", [91, ["India", "New Delhi"]]);
    testDecode("Empty Nested arrays", "llee", [[]]);

}

function underline(count) {
    console.log("-".repeat(count));
}

function main() {
    console.log("Testing Encode");
    underline(14);
    testAllEncode();

    console.log("Testing Decode");
    underline(14);
    testAllDecode();
}

main();
