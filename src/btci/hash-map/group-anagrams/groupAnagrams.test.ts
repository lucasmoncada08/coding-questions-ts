import { describe, it, expect } from "vitest";
import { groupAnagrams } from "./groupAnagrams";

type TestCase = [input: string[], expected: string[][]];

describe("groupAnagrams", () => {
  const cases: TestCase[] = [
    [
      ["eat", "tae", "table", "bleat", "aet", "tabel", "aaa"],
      [["eat", "tae", "aet"], ["table", "bleat", "tabel"], ["aaa"]],
    ],
  ];

  it.each(cases)("groupAnagrams(%j) should return %j", (input, expected) => {
    const result = groupAnagrams(input);
    const sort = (groups: string[][]) =>
      groups.map((g) => [...g].sort()).sort((a, b) => a[0].localeCompare(b[0]));
    expect(sort(result)).toEqual(sort(expected));
  });
});
