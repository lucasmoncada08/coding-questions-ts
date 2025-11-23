import { describe, expect, test } from "vitest";

import { DuplicatePasswordChecker } from "./DuplicatePassword";

describe("test duplicate password code", () => {
  test("should return 0 when no items in map", () => {
    const input = "dish";

    const duplicatePasswordChecker = new DuplicatePasswordChecker();
    expect(duplicatePasswordChecker.checkSubstringCount(input)).toEqual(0);
  });
  test("should add substrings to map", () => {
    const input = "dish";

    const duplicatePasswordChecker = new DuplicatePasswordChecker();
    duplicatePasswordChecker.handleAddPassword(input);

    expect(duplicatePasswordChecker.substringsCount.get("a")).toBeUndefined();
    expect(duplicatePasswordChecker.substringsCount.get("d")).toEqual(1);
    expect(duplicatePasswordChecker.substringsCount.get("is")).toEqual(1);
    expect(duplicatePasswordChecker.substringsCount.get("dish")).toEqual(1);
  });

  test("should be able to parse the type of query properly", () => {
    const inputOne = "add aaa";
    const inputTwo = "query a";

    const duplicatePasswordChecker = new DuplicatePasswordChecker();

    expect(duplicatePasswordChecker.parseInput(inputOne)).toEqual({
      inputType: "add",
      input: "aaa",
    });
    expect(duplicatePasswordChecker.parseInput(inputTwo)).toEqual({
      inputType: "query",
      input: "a",
    });
  });

  test("should handle a complex use case of multiple inputs", () => {
    const inputs = [
      "query dish",
      "add brandish",
      "add dishwasher",
      "add aaa",
      "query dish",
      "query a",
    ];

    const duplicatePasswordChecker = new DuplicatePasswordChecker();

    expect(duplicatePasswordChecker.handlePasswordInputs(inputs)).toEqual([
      "0",
      "",
      "",
      "",
      "2",
      "3",
    ]);
  });
});
