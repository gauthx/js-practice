import { encode } from "./src/encoder.js";

const main = () => {
  const text = prompt("Enter text to encode: ");
  console.log(encode(text));
};

main();
