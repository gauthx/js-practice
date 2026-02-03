const isConnClosed = (bytesRead) => bytesRead === null;

const readRequest = async (conn) => {
  const decoder = new TextDecoder();
  const buffer = new Uint8Array(1024);
  const bytesRead = await conn.read(buffer);
  if (isConnClosed(bytesRead)) {
    throw new Error("Connection closed");
  }
  return decoder.decode(buffer);
};

const handleConnection = async (conn) => {
  try {
    while (true) {
      const request = await readRequest(conn);
      console.log(request);
    }
  }
  catch (err) {
    console.error(err.message)
  }
};

const startServer = async (port) => {
  console.log("Server started on port", port);
  const listener = Deno.listen({
    hostname: "127.0.0.1",
    port,
    transport: "tcp",
  });
  for await (const conn of listener) {
    handleConnection(conn);
  }
};

const main = (args) => {
  const [port = 8000] = args;
  startServer(port);
};

main(Deno.args);
