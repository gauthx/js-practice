const isNumber = (char) => Number.isInteger(parseInt(char));

const isCharacter = (char) => /[a-z]/.test(char);

export const tokenizer = (expression) => {
  const tokens = [];
  let cursor = 0;

  while (cursor < expression.length) {
    const currentChar = expression[cursor];

    if (currentChar === "(") {
      tokens.push({ type: "opening-parenthesis", value: "(" });
      cursor++;
      continue;
    }

    if (currentChar === ")") {
      tokens.push({ type: "closing-parenthesis", value: ")" });
      cursor++;
      continue;
    }

    if (isNumber(currentChar)) {
      let number = "";

      while (isNumber(expression[cursor])) {
        number += expression[cursor];
        cursor++;
      }

      tokens.push({ type: "number-literal", value: number });
      continue;
    }

    if (currentChar === '"') {
      let string = "";
      cursor++;

      while (expression[cursor] !== '"') {
        string += expression[cursor];
        cursor++;
      }

      cursor++;
      tokens.push({ type: "string", value: string });
      continue;
    }

    if (isCharacter(currentChar)) {
      let name = "";

      while (isCharacter(expression[cursor])) {
        name += expression[cursor];
        cursor++;
      }

      tokens.push({ type: "name", value: name });
    }

    if (currentChar === " ") {
      cursor++;
    }
  }

  return tokens;
};
