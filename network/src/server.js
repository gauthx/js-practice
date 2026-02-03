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

const formatResponseLine = ({ protocol, statusCode, statusDesc }) =>
  `${protocol} ${statusCode} ${statusDesc}`;

const formatResponseHeaders = (headers) =>
  Object.entries(headers).map(([name, value]) => `${name}:${value}`)
    .join("\r\n");

const writeResponse = async (conn, response) => {
  const finalResponse = [
    formatResponseLine(response.responseLine),
    formatResponseHeaders(response.headers),
    "",
    response.body,
  ];

  const encoder = new TextEncoder();
  console.log(finalResponse.join("\r\n"));
  await conn.write(encoder.encode(finalResponse.join("\r\n")));
};

const handleConnection = async (conn, handleRequest) => {
  try {
    while (true) {
      const request = await parseRequest(conn);
      console.log(request, "\n");
      const response = await handleRequest(request);
      console.log(response);
      await writeResponse(conn, response);
    }
  } catch (err) {
    console.error(err.message);
  }
};

const startServer = async (port, handleRequest) => {
  console.log("Server started on port", port);
  const listener = Deno.listen({
    hostname: "127.0.0.1",
    port,
    transport: "tcp",
  });
  for await (const conn of listener) {
    handleConnection(conn, handleRequest);
  }
};

export const serve = async (port, handleRequest) => {
  await startServer(port, handleRequest);
};
