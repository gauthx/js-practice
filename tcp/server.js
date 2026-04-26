const writeResponse = async (conn, reply) => {
  const encoder = new TextEncoder();
  await conn.write(encoder.encode(reply));
};

const processRequest = (userName, request) => {
  return `${userName}: ${request}`;
};

const isConnClosed = (bytesRead) => bytesRead === null;

const readRequest = async (conn) => {
  const decoder = new TextDecoder();
  const buffer = new Uint8Array(1024);
  const bytesRead = await conn.read(buffer);
  if (isConnClosed(bytesRead)) {
    throw new Error(`${conn.localAddr.hostname} closed the connection`);
  }
  const request = decoder.decode(buffer.slice(0, bytesRead));
  return request;
};

const broadcastMessage = async (clients, reply) => {
  for (const client of clients) {
    await writeResponse(client, reply);
  }
};

const readUserName = async (conn) => {
  await writeResponse(conn, "Enter your name: ");
  const userName = await readRequest(conn);
  return userName;
};

const handleConnection = async (conn, clients) => {
  try {
    console.log(`${conn.localAddr.hostname} joined.`);
    const userName = await readUserName(conn);
    await broadcastMessage(clients, `${userName} joined the chat`);
    while (true) {
      const request = await readRequest(conn);
      const reply = await processRequest(userName, request);
      await broadcastMessage(clients, reply);
    }
  } catch (err) {
    console.error(err.message);
  }
};

const startServer = async (hostname, port) => {
  console.log(`Server started on hostname ${hostname} and port ${port}`);
  const listener = Deno.listen({ hostname, port, transport: "tcp" });
  const clients = new Set();

  for await (const conn of listener) {
    clients.add(conn);
    handleConnection(conn, clients);
  }
};

const main = (args) => {
  const [hostname = "localhost", port = 8000] = args;
  startServer(hostname, port);
};

main(Deno.args);
