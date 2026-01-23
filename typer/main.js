import { typer } from "./src/typer.js";

const main = async () => {
  await Deno.stdin.setRaw(true, { cbreak: true });
  await typer();
}

await main();