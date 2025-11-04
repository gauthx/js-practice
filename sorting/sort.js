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

function areDeepEqual(element1, element2) {
  if (typeof element1 !== typeof element2) {
    return false;
  }

  if (Array.isArray(element1) && Array.isArray(element2)) {
    return areArraysEqual(element1, element2);
  }

  return element1 === element2;
}

function testSort(message, data, expectedValue) {
  const actualValue = sort(data);
  const isPass = areDeepEqual(actualValue, expectedValue);
  let emojiMessage = isPass ? "✅" : "❌";
  emojiMessage += message;

  const inputMessage = isPass ? '' : `\n  Inputs\t:[${data}]`;
  const expectedMessage = isPass ? '' : `  Expected\t: ${expectedValue}`;
  const actualMessage = isPass ? '' : `\n  Actual\t: ${actualValue}`;
  console.log(emojiMessage, inputMessage);
  console.log(expectedMessage, actualMessage);
}

function testAll() {
  console.log("Testing Sort");
  console.log("-".repeat(15));
  testSort("[3,1,2]", [3, 1, 2], [1, 2, 3]);
  testSort("Already sorted array", [1, 2, 3, 4], [1, 2, 3, 4]);
  testSort("Descending order array", [3, 2, 1], [1, 2, 3]);
}

testAll();
