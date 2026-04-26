const readResponse = async (client) => {
  const decoder = new TextDecoder();
  const buffer = new Uint8Array(1024);
  await client.read(buffer);
  return decoder.decode(buffer);
};

const sendRequest = async (client, request) => {
  const encoder = new TextEncoder();
  await client.write(encoder.encode(request));
};

const displayResponse = (response) => {
  console.log(response)
}

const connectToServer = async (hostname, port) => {
  console.log(`Connected to ${hostname} on port ${port}`);
  const client = await Deno.connect({ hostname, port, transport: "tcp" });

  while (true) {
    const response = await readResponse(client);
    displayResponse(response);
    const req = prompt(">>");
    await sendRequest(client, req);
  }
};

const main = (args) => {
  const [hostname = "localhost", port = 8000] = args;
  connectToServer(hostname, port);
};

main(Deno.args);
