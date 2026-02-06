import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { encode, toBinary } from "../src/encoder.js";

describe("testing to ASCII bytes convertor", () => {
  it("converting 'Man' to ASCII bytes", () => {
    assertEquals(toBinary("Man"), ["01001101", "01100001", "01101110"]);
  });
});

Deno.test("encoding 'man' to base64 ", () => {
  const expectedValue = "TWFu";
  assertEquals(encode("Man"), expectedValue);
});
