import { serve } from "./src/server.js";

const main = async (args) => {
  const [port = 8000] = args;
  await serve(port);
};

main(Deno.args);
