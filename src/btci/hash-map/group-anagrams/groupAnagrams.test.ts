import { describe, it, expect } from "vitest";
import { groupAnagrams, sortedKey, frequencyKey } from "./groupAnagrams";

type TestCase = [input: string[], expected: string[][]];

const sort = (groups: string[][]) =>
  groups.map((g) => [...g].sort()).sort((a, b) => a[0].localeCompare(b[0]));

describe("groupAnagrams (sortedKey)", () => {
  const cases: TestCase[] = [
    [
      ["eat", "tae", "table", "bleat", "aet", "tabel", "aaa"],
      [["eat", "tae", "aet"], ["table", "bleat", "tabel"], ["aaa"]],
    ],
    // empty strings group together
    [["", "", "a"], [["", ""], ["a"]]],
    // all unique — each string is its own group
    [["abc", "def", "ghi"], [["abc"], ["def"], ["ghi"]]],
    // long repeated characters
    [
      ["aaaaab", "baaaaa", "aaaaac"],
      [["aaaaab", "baaaaa"], ["aaaaac"]],
    ],
    // strings with spaces
    [
      ["a b", "b a", " ab", "ba "],
      [["a b", "b a", " ab", "ba "]],
    ],
    // single empty array
    [[], []],
  ];

  it.each(cases)("groupAnagrams(%j) should return %j", (input, expected) => {
    const result = groupAnagrams(input, sortedKey);
    expect(sort(result)).toEqual(sort(expected));
  });
});

describe("groupAnagrams (frequencyKey)", () => {
  const cases: TestCase[] = [
    [
      ["eat", "tae", "table", "bleat", "aet", "tabel", "aaa"],
      [["eat", "tae", "aet"], ["table", "bleat", "tabel"], ["aaa"]],
    ],
    // all unique — each string is its own group
    [["abc", "def", "ghi"], [["abc"], ["def"], ["ghi"]]],
    // long repeated characters
    [
      ["aaaaab", "baaaaa", "aaaaac"],
      [["aaaaab", "baaaaa"], ["aaaaac"]],
    ],
    // single empty array
    [[], []],
  ];

  it.each(cases)("groupAnagrams(%j) should return %j", (input, expected) => {
    const result = groupAnagrams(input, frequencyKey);
    expect(sort(result)).toEqual(sort(expected));
  });
});
