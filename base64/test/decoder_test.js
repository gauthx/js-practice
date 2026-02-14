import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { decoder } from "../src/decoder.js";

describe("testing decoding", () => {
  it("decoding from base64 - ", () => {
    assertEquals(decoder("TWFu"), "Man");
  });

  it("decoding  - decoded value contains padded characters", () => {
    assertEquals(decoder("TWE="), "Ma");
  });

  it("decoding  - decoded value contains padded characters", () => {
    assertEquals(decoder("UGl6emE="), "Pizza");
  });
});
