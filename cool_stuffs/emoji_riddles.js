const TOTAL_NO_OF_QNS = 14;

function format(code, text) {
  return `\x1B[${code}m${text}\x1B[0m`;
}

function red(text) {
  return format(31, text);
}

function green(text) {
  return format(32, text);
}

function blue(text) {
  return "\x1B[34m" + text + "\x1B[0m";
}

function yellow(text) {
  return format(33, text);
}

function cyan(text) {
  return format(36, text);
}

function black(text) {
  return "\x1B[30m" + text + "\x1B[0m";
}

function magenta(text) {
  return format(35, text);
}

function italic(text) {
  return format(3, text);
}

function bgWhite(text) {
  return format(47, text);
}

function generateHint(qNo) {
  const hints = ["An interval of time", "➡️ - right", "an animal", "A trophy", "movie character", "a place"
    , "a city", "a brand", "a brand", "a brand", "a brand", "a movie", "a country", "an actor", "motivational quote"
  ]
  return `${green(`Hint:-${hints[qNo]}`)}`;
}

function generateRiddle(qNo) {
  const riddles = ["☕️+💔", "🐝+➡️+🔙", "⌚️+🐶", "🌎+⛾", "🕷️+👨🏿", "😡+⛽️+🚗", "🦶+🔑+🅾️", "⭐+💰",
    "👀+📱", "🪁+🐱", "🚫+🔑", "🦑+🎮", "🗣️🎶+🐾", "🍅+🚢", "🪑+⬆️"
  ];
  const answers = ["coffee break", "be right back", "watchdog", "worldcup", "spiderman",
    "madagascar", "tokyo", "starbucks", "iphone", "kitkat", "nokia", "squid game", "singapore",
    "tom cruise", "cheer up"];

  const riddleWithAnswer = [];
  riddleWithAnswer.push(riddles[qNo]);
  riddleWithAnswer.push(answers[qNo]);

  return riddleWithAnswer;
}

function displayGameDescription() {
  console.log(`${"━".repeat(47)}
${italic(`Welcome to the emoji riddle🧩 game
  1.A dash(_) indicates a letter
  2.Space separates words
  3.Scoring system is as follows
    ${green("3")} ${italic(`points if you can guess it on first try`)}
    ${yellow("2")} ${italic(`points if you can guess it on second try`)}
    ${cyan("1")} ${italic(`point if you can guess it on second try`)}
   ${red("-1")} ${italic(`point if you couldn't guess it🤭`)}
${"━".repeat(47)}`)}
  `);
}

function displayMessage(isAnswerCorrect, tries, answer) {
  const msg = tries === 1 ? `\nThe answer is ${`${cyan(answer)}`}` : "";
  if (isAnswerCorrect) {
    return "Hooray your answer is correct🥳\n";
  }
  return `Ooops! Incorrect answer🤓
No. of tries left : ${red(tries - 1)}${msg}\n`;
}

function isUsedQuestion(questions, qNo) {
  for (let index = 0; index < questions.length; index++) {
    if (questions[index] === qNo) {
      return true;
    }
  }
  return false;
}

function generateQNo(answeredQstns) {
  const high = TOTAL_NO_OF_QNS;
  const low = -1;
  let QNo;
  let isQuestionAlreadyAnswered = true;
  while (isQuestionAlreadyAnswered) {
    QNo = Math.floor(Math.random() * (high - low) + low + 1);
    isQuestionAlreadyAnswered = isUsedQuestion(answeredQstns, QNo);
  }
  return QNo;
}

function isInvalidGuess(guess) {
  const isInvalidType = typeof guess !== "string";
  const isNaN = guess + "" === "NaN";

  return isInvalidType || isNaN;
}

function guessRiddle() {
  let isGuessValid = true;
  let guess;
  while (isGuessValid) {
    guess = prompt("Enter your guess: ");
    isGuessValid = isInvalidGuess(guess);
  }
  return guess;
}

function generateDashes(answer) {
  let dashes = "";
  for (let index = 0; index < answer.length; index++) {
    const char = answer[index] === " " ? " " : `${bgWhite(`${black("_")}`)}`;
    dashes += char;
  }
  return dashes;
}

function displayQuestion(question, dashedAnswer) {
  const showdashes = dashedAnswer === "" ? "" : `\n${dashedAnswer}`
  console.log("━".repeat(23));
  console.log(question, dashedAnswer);
}

function displayHints(tries,answer,qNo) {
  switch (tries) {
    case 3:
      const dashedAnswer = generateDashes(answer);
      console.log(dashedAnswer);
      break;
    case 2:
      console.log(generateHint(qNo));
      break;
    default:
      return;
  }
}

function main() {
  displayGameDescription();

  const username = prompt("Enter your name: ");
  console.log("\n");
  let userScore = 0;

  let isAnswerCorrect = false;
  let riddleWithAnswer, riddle, answer, qNo;
  let tries = 4;
  const answeredQstns = [];

  console.log(`${magenta("🆕 New Question")}`);
  qNo = generateQNo(answeredQstns);
  answeredQstns.push(qNo);
  riddleWithAnswer = generateRiddle(qNo);
  riddle = riddleWithAnswer[0];
  answer = riddleWithAnswer[1];

  while (true) {
    if (answeredQstns.length === TOTAL_NO_OF_QNS && (tries === 1 || isAnswerCorrect)) {
      const score = tries === 1 && !isAnswerCorrect ? -1 : tries;
      userScore += score;
      break;
    }

    if (isAnswerCorrect || tries === 1) {
      console.log(`${magenta("🆕 New Question")}`);
      const score = tries === 1 && !isAnswerCorrect ? -1 : tries;
      userScore += score;
      tries = 4;
      qNo = generateQNo(answeredQstns);
      answeredQstns.push(qNo);
      riddleWithAnswer = generateRiddle(qNo);
      riddle = riddleWithAnswer[0];
      answer = riddleWithAnswer[1];
    }

    displayHints(tries,answer,qNo);

    displayQuestion(riddle,"");

    const userGuess = guessRiddle();
    isAnswerCorrect = userGuess.toLowerCase() === answer;
    tries--;

    console.log(displayMessage(isAnswerCorrect, tries, answer));
  }


  console.clear();
  console.log(`${username} : ${userScore}`)

}

main();
