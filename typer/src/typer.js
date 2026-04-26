import {
  bold,
  brightYellow,
  gray,
  red,
  stripAnsiCode,
} from "jsr:@std/fmt/colors";
import { calculateStatistics, displayStatistics } from "./statistics.js";

const isBackspace = (buffer) => buffer.at(0) === 127;

const chooseColor = (typedChar, typedCharacters, sentence) => {
  return sentence[typedCharacters.length] === typedChar ? brightYellow : red;
};

const randomSentence = async () => {
  // try catch
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=10",
  );
  const randomWords = JSON.parse(await response.text());
  return randomWords.join(" ").split("");
};

const typingPreview = (targetChars, typedChars) => {
  const preview = typedChars.join("") + "|" +
    boldGray(targetChars.slice(typedChars.length).join(""));
  console.log(preview);
};

const boldGray = (text) => bold(gray(text));

const isTypingDone = (targetChars, typedChars) => targetChars.length === typedChars.length;

const startTyping = async (targetChars) => {
  console.log(boldGray(targetChars.join("")));

  const typedChars = [];
  const decoder = new TextDecoder();
  for await (const keyStroke of Deno.stdin.readable) {
    console.clear();

    if (isBackspace(keyStroke)) {
      typedChars.pop();
    } else {
      const typedChar = decoder.decode(keyStroke);
      const colorer = chooseColor(typedChar, typedChars, targetChars);
      typedChars.push(bold(colorer(typedChar)));
    }
    typingPreview(targetChars, typedChars);

    if (isTypingDone(targetChars, typedChars)) {
      break;
    }
  }

  return typedChars;
};

const removeColors = (coloredChars) =>
  coloredChars.map((char) => stripAnsiCode(char));

export const typer = async () => {
  const targetChars = await randomSentence();
  const startTime = Date.now();
  const typedChars = await startTyping(targetChars);
  const endTime = Date.now();
  const timestamps = { startTime, endTime };
  const plainTypedChars = removeColors(typedChars);

  const statistics = calculateStatistics(
    targetChars,
    plainTypedChars,
    timestamps,
  );
  displayStatistics(statistics);
};
