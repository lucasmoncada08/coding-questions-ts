import { describe, it, expect } from "vitest";
import { palindromeCheck } from "./palindromeCheck";

describe("testing palindrome code", () => {
  it("valid palindromes", () => {
    const palindrome = ["aaa", "racecar", "abccba"];
    for (const p of palindrome) {
      expect(palindromeCheck(p)).toBe(true);
    }
  });

  it("invalid palindromes", () => {
    const invalidPalindromes = ["ab", "racekar"];
    for (const p of invalidPalindromes) {
      expect(palindromeCheck(p)).toBe(false);
    }
  });
});
