import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { tokenizer } from "../src/compiler.js";

describe("testing tokenizer", () => {
  it("should tokenize paranthesis", () => {
    const expected = [{ type: "opening-parenthesis", value: "(" }, {
      type: "closing-parenthesis",
      value: ")",
    }];
    assertEquals(tokenizer("()"), expected);
  });

  it("should tokenize a number literal as a whole", () => {
    const expected = [{ type: "opening-parenthesis", value: "(" }, {
      type: "number-literal",
      value: "22",
    }, {
      type: "closing-parenthesis",
      value: ")",
    }];
    assertEquals(tokenizer("(22)"), expected);
  });

  it("should tokenize a function call", () => {
    const expected = [{ type: "opening-parenthesis", value: "(" }, {
      type: "name",
      value: "add",
    }, {
      type: "number-literal",
      value: "10",
    }, {
      type: "number-literal",
      value: "20",
    }, {
      type: "closing-parenthesis",
      value: ")",
    }];
    assertEquals(tokenizer("(add 10 20)"), expected);
  });

  it("should tokenize string", () => {
    const expected = [ {
      type: "string",
      value: "apple",
    }];

    assertEquals(tokenizer('"apple"'), expected);
  });
});
