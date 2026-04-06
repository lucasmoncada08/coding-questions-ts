import { describe, it, expect } from "vitest";
import { minimumWindowSubstring } from "./minimumWindowSubstring";

type TestCase = [s: string, t: string, expected: string];

describe("minimumWindowSubstring", () => {
  const cases: TestCase[] = [
    // basic cases — window is exactly length of t
    ["abeccab", "abc", "cab"],
    ["abbcabc", "abc", "bca"],
  ];

  it.each(cases)(
    'minimumWindowSubstring("%s", "%s") should return "%s"',
    (s, t, expected) => {
      expect(minimumWindowSubstring(s, t)).toBe(expected);
    }
  );
});
