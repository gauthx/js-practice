export const handleRequest = async (request, readFn = Deno.readTextFile) => {
  if (request.path === "/") {
    const homePage = await readFn("html/home.html");
    const headers = {
      "Content-Type": "text/html",
      "Content-Length": homePage.length,
    };
    const responseLine = {
      protocol: request.protocol,
      statusCode: 200,
      statusDesc: "OK",
    };

    const response = {
      responseLine,
      headers,
      body: homePage,
    };

    return response
  }
};
