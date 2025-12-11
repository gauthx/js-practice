const main = () => {
  const code = Deno.readTextFileSync("./functions.js");
  const replaced = code.replaceAll(
    /function (\w+)(\([a-zA-Z, ]*\))/g,
    "const $1 = $2 =>",
  );
  
  Deno.writeTextFileSync("./arrow_functions.js",replaced);
};

main();
