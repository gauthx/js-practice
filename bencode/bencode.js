function isInteger(data) {
    return typeof data === "number";
}

function isString(data) {
    return typeof data === "string";
}

function bencodeInteger(integer) {
    return `i${integer}e`;
}

function bencodeString(string) {
    return `${string.length}:${string}`;
}

function encodeArray(array, index, bencodedString = "l") {
    if (index === array.length) {
        return bencodedString + "e";
    }

    const element = array[index];

    if (Array.isArray(element)) {
        const bencode = "l";
        return encodeArray(element, 0, bencodedString + bencode);
    }

    if (isInteger(element)) {
        const bencode = bencodeInteger(element);
        return encodeArray(array, index + 1, bencodedString + bencode);
    }

    if (isString(element)) {
        const bencode = bencodeString(element);
        return encodeArray(array, index + 1, bencodedString + bencode);
    }

}

function encode(data) {
    if (Array.isArray(data)) {
        return encodeArray(data, 0);
    }

    if (isInteger(data)) {
        return bencodeInteger(data);
    }

    if (isString(data)) {
        return bencodeString(data);
    }

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

function isBenCodedStringData(bencodedString, index = 0) {
    const numbers = ["0","1","2","3","4","5","6","7","8","9"];
    return  numbers.includes(bencodedString[index]);
}
function decodeString(bencodedString, index = 0) {
    const lengthSeparatorIndex = bencodedString.indexOf(":", index);
    const stringLength = parseInt(bencodedString.slice(index, lengthSeparatorIndex));
    const stringEndIndex = lengthSeparatorIndex + stringLength;

    return bencodedString.slice(lengthSeparatorIndex + 1, stringEndIndex + 1);
}

function isBencodedArray(bencodedString, index = 0) {
    return bencodedString[index] === "l";
}

function decodeInt(bencodedString, index = 0) {
    const integerEndIndex = bencodedString.indexOf("e", index);
    return parseInt(bencodedString.slice(index + 1, integerEndIndex));
}

function decodeArray(bencodedString) {
    const array = [];
    let nextElementIndex;
    let index = 1;

    while(index < bencodedString.length) {

        if (isBencodedInt(bencodedString, index)) {
            const number = decodeInt(bencodedString, index);
            array.push(number);

            nextElementIndex = bencodedString.indexOf("e", index) + 1;
            index = nextElementIndex;
        }
           
        if(isBenCodedStringData(bencodedString, index)) {
            const string = decodeString(bencodedString,index);
            array.push(string);        
        }

    }

    return array;
}

function decode(bencodedString) {
    if (isBencodedInt(bencodedString)) {
        return decodeInt(bencodedString);
    }

    if (isBencodedArray(bencodedString)) {
        return decodeArray(bencodedString);
    }

    if(isBenCodedStringData(bencodedString)) {
        return decodeString(bencodedString);
    }
    
}

function testDecode(message, bencodedString, expectedValue) {
    const actualValue = decode(bencodedString);
    const isPass = areDeepEqual(actualValue,expectedValue);
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
    testEncode("Nested array", [91, ["India", "New Delhi"]], "li91el5:India9:New Delhie");
}

function testAllDecode() {
    testDecode("Integer 1024", "i1024e", 1024);
    testDecode("Simple string", "5:hello", "hello");
    testDecode(" Array containing Integer only", "li23ei12ee", [23, 12]);
    testDecode("Array containing integer and string element", "li2025e4:yeare", [2025, "year"]);
}

function underline(count) {
    "-".repeat(count);
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
