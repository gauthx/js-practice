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

const countOf = (element, array) => {
  return array.reduce((count, value) => value === element ? count + 1 : count, 0);
}

const sum = (sum, number) => sum + number;

const uniqueUsingReduce = (unique, element) => {
  if (!unique.includes(element))
    unique.push(element)


  return unique;
}

const unique = (array) => {
  return array.filter((value, index) => array.indexOf(value) === index)
};


const isA = (char) => char === "a" || char === "A";


function testAll() {
  const ribbons = ["red", "blue", "red", "green", "red", "blue"];
  test("how many blue ribbons", ribbons, 2, countOf("blue", ribbons));

  const constellations = [["Orion", "Leo"], ["Taurus"], ["Orion", "Gemini"]];
  const combinedConstellations = ["Orion", "Leo", "Taurus", "Orion", "Gemini"];
  test("Combining constellations spotted", constellations, combinedConstellations, constellations.flat());

  const birds = ["sparrow", "crow", "sparrow", "eagle", "crow"];
  const uniqueBirds = ["sparrow", "crow", "eagle"];
  test("list of birds without repeating", birds, uniqueBirds, unique(birds));

  const candyLogs = [[5, 3], [2], [4, 1]];
  test("total number of candies", candyLogs, 15, candyLogs.flat().reduce(sum, 0));

  const choirSequences = [["mi", "fa", "so"], ["do", "mi"], ["fa"]];
  test("any group sang do ?", choirSequences, true, choirSequences.flat().some((sequence) => sequence === "do"));

  const temperatureSheets = [[22, 23], [25, 24, 22], [29]];
  test("Checking if every temperature is below 32", temperatureSheets, true, temperatureSheets.flat().every((temperature) => temperature < 32));

  const runnerLogs = [[2, 3, 2], [4], [1, 1]];
  test("Total Miles run", runnerLogs, 13, runnerLogs.flat().reduce(sum, 0));

  const paintColors = [["blue", "yellow"], ["yellow", "green"], ["blue"]];
  test("Unique Colors", paintColors, ["blue", "yellow", "green"], unique(paintColors.flat()));

  const booksReturned = ["Dune", "Dune", "Foundation", "Dune"];
  test("Count of how many times Dune returned", booksReturned, 3, countOf("Dune", booksReturned));

  const measurements = [[3, 4], [5, 2], [1]];
  test("Are all measurements positive", measurements, true, measurements.flatMap((value) => value).every((element) => element > 0));

  const words = [["How", "are", "you"]["I", "am", "fine"], ["hey", "there"]];
  // test("combine  all words written on 3 worksheets");


  const uniqueColors = unique(paintColors.flat());
  console.log(uniqueColors);
  test("Summarize how many times each color appears in a creative art project",
    paintColors, true, uniqueColors.map((color) => {
      // console.log(color);
      return [color, countOf(color, paintColors.flat())]
    }));

  const sentences = ['just a phrase', 'also another phrase', 'arbitrary phrase', 'An interesting phrase'];
  test("All words starting with 'a' in a sentence",sentences,[ "a", "also", "another", "arbitrary", "An" ],
    sentences.flatMap((sentence) => {
      const words = sentence.split(" ");
      return words.filter((word) => isA(word[0]) );
    })
  )

}

testAll();
