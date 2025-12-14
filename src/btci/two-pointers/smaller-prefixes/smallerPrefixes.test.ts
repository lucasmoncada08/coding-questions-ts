import { describe, it, expect } from "vitest";

import { smallerPrefixes } from "./smallerPrefixes";

describe("test smaller prefixes checking", () => {
  it("test basic examples", () => {
    const testCases = [
      [1, 2, 3, 4],
      [1, 2, 2, -1],
    ];

    for (const test of testCases) {
      expect(smallerPrefixes(test)).toBe(true);
    }
  });

  it("test failed example", () => {
    const testCases = [[1, 2, -2, 1, 3, 5]];

    for (const test of testCases) {
      expect(smallerPrefixes(test)).toBe(false);
    }
  });
});
