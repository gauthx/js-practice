const randomNumBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const breakText = (text, length) => {
  const brokenText = [];
  let start = 0;
  let end = length;
  while (end < text.length) {
    const sliceOfText = text.slice(start, end);
    const template = `{${sliceOfText},`;
    brokenText.push(template);
    start = end;
    end += length;
  }

  return brokenText;
};

const generateGarbageText = (length) => {
  const chars = [
    "%",
    "&",
    "^",
    "*",
    "a",
    "z",
    "k",
    "l",
    "z",
    "{",
    "|",
    "#",
    "~",
  ];

  const garbage = [];
  for (let index = 0; index < length; index++) {
    const randomIndex = randomNumBetween(0, chars.length - 1);
    garbage.push(chars[randomIndex]);
  }

  return garbage;
};

const insertTextInBetween = (garbage, text) => {
  const randomStartIndex = randomNumBetween(
    0,
    garbage.length - text.length + 1,
  );
  return garbage.toSpliced(randomStartIndex, text.length, ...text);
};

const main = () => {
  const sentence = "I love apple!";
  const brokenSentence = breakText(sentence, 3);
  const obfuscated = [];
  for (const brokenText of brokenSentence) {
    const garbageText = generateGarbageText(20);
    const obfuscatedLine = insertTextInBetween(garbageText, brokenText);
    obfuscated.push(obfuscatedLine.join(""));
  }
  console.log(obfuscated.join("\n"));
};

main();
