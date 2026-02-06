const createLookup = (lookup, asciiStart, asciiEnd, mappedVal) => {
  for (let ascii = asciiStart; ascii <= asciiEnd; ascii++) {
    const char = String.fromCharCode(ascii);
    lookup[mappedVal++] = char;
  }
  return lookup;
};

const main = () => {
  const lookupTable = {};
  createLookup(lookupTable, 65, 90, 0); // uppercase letters mapping
  createLookup(lookupTable, 97, 122, 26); // lowercase letters mapping
  createLookup(lookupTable, 48, 57, 52); // 0-9 mapping
  lookupTable[62] = "+";
  lookupTable[63] = "/";
  console.log(lookupTable);

  Deno.writeTextFileSync(
    "./data/lookup_table.json",
    JSON.stringify(lookupTable),
  );
};

main();
