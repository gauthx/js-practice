import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { encode, toBytes } from "../src/encoder.js";

describe("testing to ASCII bytes convertor", () => {
  it("converting 'Man' to ASCII bytes", () => {
    assertEquals(toBytes("Man"), ["01001101", "01100001", "01101110"]);
  });
});

describe("testing encoding", () => {
  it("encoding 'man' to base64 - no padding required", () => {
    const expectedValue = "TWFu";
    assertEquals(encode("Man"), expectedValue);
  });

  it("encoding 'Ma' to base64 padding is required", () => {
    const expectedValue = "TWE=";
    assertEquals(encode("Ma"), expectedValue);
  });

  it("encoding 'Pizza' to base64 padding is required", () => {
    const expectedValue = "UGl6emE=";
    assertEquals(encode("Pizza"), expectedValue);
  });
});
