import { describe, it, expect } from "vitest";
import { indexOf, indexOfWithRollingHash } from "./stringMatching";

describe("match a given substring in a string", () => {
  it("match simple string inside a longer string", () => {
    const substring = "a";
    const str = "cat";
    expect(indexOfWithRollingHash(str, substring)).toEqual(1);
  });

  it("match multi char substring in string", () => {
    const substring = "cd";
    const str = "abcde";
    expect(indexOfWithRollingHash(str, substring)).toBe(2);
  });

  it("match multi char substring with repeating chars in string", () => {
    const substring = "bbbc";
    const str = "abbbbbcde";
    expect(indexOfWithRollingHash(str, substring)).toBe(3);
  });
});
