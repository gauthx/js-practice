import { chunk } from "jsr:@std/collections/chunk";

const loadLookUpTable = () =>
  JSON.parse(Deno.readTextFileSync("./data/lookup_table.json"));

export const toBytes = (string) => {
  const bytes = [];
  for (const char of string) {
    const ascii = char.charCodeAt();
    const byte = ascii.toString(2).padStart(8, "0");
    bytes.push(byte);
  }

  return bytes;
};

const toBase64 = (lookupTable, bytes, paddingRequired) => {
  const encoded = bytes.map((byte) => {
    const decimal = parseInt(byte, 2);
    return lookupTable[decimal];
  }).join("");

  return encoded + "=".repeat(paddingRequired);
};

const groupOf6 = (bytes) => {
  const chunks = chunk(bytes.join(""), 6);
  return chunks.map((chunk) => chunk.join("").padEnd(6, "0"));
};

const calculatePadSize = (bytes) => (3 - bytes.length % 3) % 3;

export const encode = (value) => {
  const lookupTable = loadLookUpTable();
  const bytes = toBytes(value);
  const chunks = groupOf6(bytes);

  const paddingRequired = calculatePadSize(bytes);
  return toBase64(lookupTable, chunks, paddingRequired);
};
