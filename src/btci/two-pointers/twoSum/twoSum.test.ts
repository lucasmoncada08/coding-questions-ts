import { describe, it, expect } from "vitest";

import { twoSum } from "./twoSum";

type TestCase = [input: number[], expected: boolean];

describe("testing two sum", () => {
  const cases: TestCase[] = [
    [[-5, -2, -1, 1, 1, 10], true],
    [[-3, 0, 0, 1, 2], true],
    [[-5, -3, -1, 0, 2, 4, 6], false],
  ];

  it.each(cases)("twoSum(%j) should return %s", (input, expected) => {
    expect(twoSum(input)).toBe(expected);
  });
});
