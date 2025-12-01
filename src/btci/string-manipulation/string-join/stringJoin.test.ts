import { describe, it, expect } from "vitest";
import { joinString } from "./stringJoin.ts";

describe("test stringJoin", () => {
  it("join a sentence together", () => {
    const strings = ["join", "by", "space"];
    expect(joinString(strings, " ")).toBe("join by space");
  });

  it("try with multiple char join", () => {
    const strings = ["b", "", "k", "", "p", "r n", "", "d", "d!!"];
    expect(joinString(strings, "ee")).toBe("beeeekeeeepeer neeeedeed!!");
  });
});
