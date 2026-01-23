import { format } from "@std/fmt/duration";

const calculateGrossWPM = (typedChars, { startTime, endTime }) => {
  const totalKeyStrokes = typedChars.length;
  const timeTaken = endTime - startTime;
  return Math.round((totalKeyStrokes / 5) / (timeTaken / 60_000));
};

const isCorrectChar = (char1, char2) => char1 === char2;

const noOfIncorrectChars = (chars, typedChars) =>
  typedChars.reduce(
    (count, char, index) => count + (isCorrectChar(char, chars[index]) ? 0 : 1),
    0,
  );

const calculateNetWPM = (chars, typedChars, { startTime, endTime }) => {
  const timeTakenMS = endTime - startTime;
  const noOfWrongChars = noOfIncorrectChars(chars, typedChars);
  return Math.round(
    ((typedChars.length / 5) - noOfWrongChars) / (timeTakenMS / 60_000),
  );
};

const calculateAccuracy = (grossWPM, netWPM) =>
  Math.round((netWPM / grossWPM) * 100);

export const calculateStatistics = (chars, typedChars, timeStamps) => {
  const netWPM = calculateNetWPM(chars, typedChars, timeStamps);
  const grossWPM = calculateGrossWPM(typedChars, timeStamps);
  const accuracy = calculateAccuracy(grossWPM, netWPM);
  const timeTook = format(timeStamps.endTime - timeStamps.startTime, {
    ignoreZero: true,
  });

  return { netWPM, grossWPM, accuracy, timeTook };
};

export const displayStatistics = (statistics) => {
  console.log(`Gross WPM: ${statistics.grossWPM}
Net WPM: ${statistics.netWPM}
Accuracy: ${statistics.accuracy}
Time took: ${statistics.timeTook}`);
};
