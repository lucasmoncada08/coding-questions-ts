import { describe, it, expect } from "vitest";
import { stringSplit } from "./stringSplit";

describe("test split string", () => {
  it("test split on space in sentence", () => {
    const sentence = "hello my name is";
    const result = stringSplit(sentence, " ");
    expect(result).toEqual(["hello", "my", "name", "is"]);
  });

  it("test repeated split characters", () => {
    const str = "/home/.//Desktop/";
    const result = stringSplit(str, "/");
    expect(result).toEqual(["", "home", ".", "", "Desktop", ""]);
  });

  // additional edge cases to cover: empty delimeter, empty input string, string without the delim
});
