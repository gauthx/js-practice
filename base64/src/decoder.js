import { loadLookUpTable } from "../utils/create_lookup_table.js";
import { invert } from "jsr:@std/collections/invert";
import { chunk } from "jsr:@std/collections/chunk";

const toBytes = (string, lookupTable) => {
  const paddingRemoved = string.split("").filter((char) => char !== "=");
  const bytes = [];
  for (const char of paddingRemoved) {
    const value = parseInt(lookupTable[char]);
    const byte = value.toString(2).padStart(6, "0");
    bytes.push(byte);
  }

  return bytes;
};

const decode = (bytes) => {
  return bytes.map((byte) => String.fromCharCode(parseInt(byte, 2))).join("");
};

const groupOf8 = (bytes) => {
  const chunks = chunk(bytes.join(""), 8);
  return chunks.map((chunk) => chunk.join("")).filter((chunk) =>
    chunk.length === 8
  );
};

export const decoder = (value) => {
  const lookupTable = invert(loadLookUpTable());
  const bytes = toBytes(value, lookupTable);
  const grouped = groupOf8(bytes);
  // console.log({ lookupTable, bytes, grouped });
  return decode(grouped);
};
