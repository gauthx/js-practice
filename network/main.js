import { serve } from "./src/server.js";
import { handleRequest } from "./src/request_handlers.js";

const main = async (args) => {
  const [port = 8000] = args;
  await serve(port, handleRequest);
};

main(Deno.args);
