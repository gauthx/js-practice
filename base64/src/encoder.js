import { chunk } from "jsr:@std/collections/chunk";

const loadLookUpTable = () =>
  JSON.parse(Deno.readTextFileSync("./data/lookup_table.json"));

export const toBinary = (string) => {
  const bytes = [];
  for (const char of string) {
    const ascii = char.charCodeAt();
    const byte = ascii.toString(2).padStart(8, "0");
    bytes.push(byte);
  }

  return bytes;
};

const toBase64 = (lookupTable, bytes) => {
  return bytes.map((byte) => {
    const decimal = parseInt(byte, 2);
    console.log({ decimal, byte });
    return lookupTable[decimal];
  }).join("");
};

const groupOf6 = (bytes) => {
  const chunks = chunk(bytes.join(""), 6);
  return chunks.map((chunk) => chunk.join(""));
};

export const encode = (value) => {
  const lookupTable = loadLookUpTable();
  const bytes = toBinary(value);
  const chunks = groupOf6(bytes);
  return toBase64(lookupTable, chunks);
};
