const isConnClosed = (bytesRead) => bytesRead === null;

const readRequest = async (conn) => {
  const decoder = new TextDecoder();
  const buffer = new Uint8Array(1024);
  const bytesRead = await conn.read(buffer);
  if (isConnClosed(bytesRead)) {
    throw new Error(`${conn.localAddr.hostname} disconnected`);
  }
  return decoder.decode(buffer.slice(0, bytesRead));
};

const parseRequest = async (conn) => {
  const request = await readRequest(conn);
  const [requestLine, ...headers] = request.split("\r\n");
  const [method, path, protocol] = requestLine.split(" ");
  return { method, path, protocol, headers };
};

const handleConnection = async (conn) => {
  try {
    while (true) {
      const request = await parseRequest(conn);
      console.log(request);
    }
  } catch (err) {
    console.error(err.message);
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

export const serve = async (port) => {
  await startServer(port);
};
