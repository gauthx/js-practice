const main = () => {
  const data = Deno.readTextFileSync("./output.txt");
  const joined = data.split("\n").join("");
  console.log(joined);
};

main();
