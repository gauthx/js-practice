import {
  bold,
  brightYellow,
  gray,
  red,
  stripAnsiCode,
} from "jsr:@std/fmt/colors";
import { calculateStatistics, displayStatistics } from "./statistics.js";

const isBackspace = (arrayBuffer) => arrayBuffer.at(0) === 127;

const chooseColor = (typedChar, typedCharacters, sentence) => {
  return sentence[typedCharacters.length] === typedChar ? brightYellow : red;
};

const randomSentence = async () => {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=10",
  );
  const randomWords = JSON.parse(await response.text());
  return randomWords.join(" ").split("");
};

const typingPreview = (chars, typedChars) =>
  typedChars.join("") +
  boldGray(chars.slice(typedChars.length).join(""));

const boldGray = (text) => bold(gray(text));

const isTypingDone = (chars, typedChars) => chars.length === typedChars.length;

const startTyping = async (charsToType) => {
  console.log(boldGray(charsToType.join("")));

  const coloredChars = [];
  const decoder = new TextDecoder();
  for await (const keyStroke of Deno.stdin.readable) {
    console.clear();

    if (isBackspace(keyStroke)) {
      coloredChars.pop();
    } else {
      const typedChar = decoder.decode(keyStroke);
      const colorer = chooseColor(typedChar, coloredChars, charsToType);
      coloredChars.push(bold(colorer(typedChar)));
    }
    console.log(typingPreview(charsToType, coloredChars));

    if (isTypingDone(charsToType, coloredChars)) {
      break;
    }
  }

  return coloredChars;
};

const removeColors = (coloredChars) =>
  coloredChars.map((char) => stripAnsiCode(char));

export const typer = async () => {
  const charsToType = await randomSentence();
  const startTime = Date.now();
  const coloredChars = await startTyping(charsToType);
  const endTime = Date.now();
  const timestamps = { startTime, endTime };
  const typedChars = removeColors(coloredChars);
  const statistics = calculateStatistics(charsToType, typedChars, timestamps);
  displayStatistics(statistics);
};
