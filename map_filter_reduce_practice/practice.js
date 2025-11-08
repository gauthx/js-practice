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

function test(message, array, expectedValue, actualValue) {
  const isPass = areDeepEqual(expectedValue, actualValue);
  let emojiMessage = isPass ? "✅" : "❌";
  emojiMessage += message;

  const inputMessage = isPass ? '' : `\n  Inputs\t:[${array}]`;
  const expectedMessage = isPass ? '' : `  Expected\t: ${expectedValue}`;
  const actualMessage = isPass ? '' : `\n  Actual\t: ${actualValue}`;
  console.log(emojiMessage, inputMessage);
  console.log(expectedMessage, actualMessage);
}

const countBlue = (count, color) => color === "blue" ? count + 1 : count;

const sum = (sum, number) => sum + number;

const uniqueElements = (initial, element) => {
  console.log(`element : ${element} array : ${typeof initial} `);
  const result =  initial.includes(element) ? unique : initial.push(element);
  console.log(`Result : ${result}`);
  console.log(unique, );
  

  return result;
}

const unique = (value,index,array) => array.indexOf(value) === index;


function testAll() {
  const ribbons = ["red", "blue", "red", "green", "red", "blue"];
  test("how many blue ribbons", ribbons, 2, ribbons.reduce(countBlue, 0));

  const constellations = [["Orion", "Leo"], ["Taurus"], ["Orion", "Gemini"]];
  const combinedConstellations = ["Orion", "Leo", "Taurus", "Orion", "Gemini"];
  test("Combining constellations spotted", constellations, combinedConstellations, constellations.flat());

  const birds = ["sparrow", "crow", "sparrow", "eagle", "crow"];
  const uniqueBirds = ["sparrow", "crow", "eagle"];
  test("list of birds without repeating", birds, uniqueBirds, birds.filter(unique));

  const candyLogs = [[5, 3], [2], [4, 1]];
  test("total number of candies", candyLogs, 15, candyLogs.flat().reduce(sum, 0));

  const choirSequences = [["mi", "fa", "so"], ["do", "mi"], ["fa"]];
  test("any group sang do ?", choirSequences, true, choirSequences.flat().some((sequence) => sequence === "do"));

  const temperatureSheets = [[22, 23], [25, 24, 22], [29]];
  test("Checking if every temperature is below 32",temperatureSheets,true,temperatureSheets.flat().every((temperature) => temperature < 32));

  const runnerLogs =[[2, 3, 2],[4],[1, 1]];
  test("Total Miles run",runnerLogs,13,runnerLogs.flat().reduce(sum,0));

  const paintColors = [["blue", "yellow"],["yellow", "green"],["blue"]];
  test("Unique Colors",paintColors,["blue","yellow","green"],paintColors.flat().filter(unique));
}

testAll();
