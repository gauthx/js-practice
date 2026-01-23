import { bold, brightYellow, gray, red } from "jsr:@std/fmt/colors";
import { calculateStatistics, displayStatistics } from "./statistics.js";

const isBackspace = (arrayBuffer) => arrayBuffer.at(0) === 127;

const chooseColor = (typedChar, typedCharacters, sentence) => {
  return sentence[typedCharacters.length] === typedChar ? brightYellow : red;
};

const randomSentence = () =>
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temUt enim ad";

const typingPreview = (chars, typedChars) => {
  return typedChars.join("") +
    boldGray(chars.slice(typedChars.length).join(""));
};

const boldGray = (text) => bold(gray(text));

const readTyped = async (chars) => {
  console.log(boldGray(chars.join("")));

  const coloredChars = [];
  const typedChars = [];
  const decoder = new TextDecoder();
  for await (const keyStroke of Deno.stdin.readable) {
    console.clear();
    console.log({ typedL: typedChars.length, charsL: chars.length });

    if (isBackspace(keyStroke)) {
      coloredChars.pop();
      typedChars.pop();
    } else {
      const typedChar = decoder.decode(keyStroke);
      typedChars.push(typedChar);
      const colorer = chooseColor(typedChar, coloredChars, chars);
      coloredChars.push(bold(colorer(typedChar)));
    }
    console.log(typingPreview(chars, coloredChars));

    if (chars.length === typedChars.length) {
      break;
    }
  }

  console.log({ typedChars });
  return typedChars;
};

export const typer = async () => {
  const charsToType = randomSentence().split("");
  const startTime = Date.now();
  const typedChars = await readTyped(charsToType);
  const endTime = Date.now();
  const timeStamps = { startTime, endTime };
  const statistics = calculateStatistics(charsToType, typedChars, timeStamps);
  displayStatistics(statistics);
};
