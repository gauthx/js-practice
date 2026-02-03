import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { handleRequest } from "../src/request_handlers.js";

const mockContents = {
  dummy: "Hello This is a dummy content",
};

const mockReadTextFile = (filename) => async () =>
  await Promise.resolve(mockContents[filename]);

describe("Server should serve the homepage on request of path /", () => {
  it("Requesting path - /", async () => {
    const req = {
      method: "GET",
      path: "/",
      protocol: "HTTP/1.1",
      headers: [
        "Host: localhost:8000",
        "User-Agent: curl/8.7.1",
        "Accept: */*",
        "",
        "",
      ],
    };

    const expectedResponse = {
      body: "Hello This is a dummy content",
      headers: {
        "Content-Length": 29,
        "Content-Type": "text/html",
      },
      responseLine: {
        protocol: "HTTP/1.1",
        statusCode: 200,
        statusDesc: "OK",
      },
    };
    
    assertEquals(
      await handleRequest(req, mockReadTextFile("dummy")),
      expectedResponse,
    );
  });
});
