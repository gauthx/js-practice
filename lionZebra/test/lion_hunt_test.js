import { assertEquals } from "@std/assert";
import { calculateShortestPath } from "../src/lion_hunt.js";

Deno.test("savannah with no animals", () => {
  assertEquals(calculateShortestPath(""), -1);
});

Deno.test("savannah with only zebras", () => {
  assertEquals(calculateShortestPath("Z Z ZZ"), -1);
});

Deno.test("savannah with only lions", () => {
  assertEquals(calculateShortestPath("L  LL L"), -1);
});

Deno.test("savannah consisting of a zebra and a lion only", () => {
  assertEquals(calculateShortestPath("ZL"), 0);
});

Deno.test("savannah containing both animals", () => {
  assertEquals(calculateShortestPath("L  ZL Z"), 0);
});

Deno.test("savannah containing both animals", () => {
  assertEquals(calculateShortestPath(" L L   LZ  L"), 0);
});
