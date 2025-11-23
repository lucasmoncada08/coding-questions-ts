// import { describe, test, expect } from "vitest";
import { getMaximumCardsCollectable, divideOrSubtractEven } from "./card-game";

// what it would be like to write a minimal testing class
type TestFn = () => void;
type Test = { testName: string; testFn: TestFn };
class CustomTester {
  tests: Test[] = [];

  addTests(testName: string, testFn: TestFn) {
    this.tests.push({ testName, testFn });
  }

  runTests() {
    for (const { testName, testFn } of this.tests) {
      try {
        testFn();
        console.log(`Success: ${testName}`);
      } catch (error) {
        console.error(`Failure: ${testName}`);
        console.error(
          error instanceof Error ? `  ${error.message}` : `  ${String(error)}`,
        );
      }
    }
  }
}

function assertEquals(actual: string | number, expected: string | number) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected} but got ${actual}`);
  }
}

const tester = new CustomTester();

tester.addTests("choose best option given current card", () => {
  const evenOptionSubtracts = [4, 8, 48, 100, 400];
  for (const num of evenOptionSubtracts) {
    assertEquals(divideOrSubtractEven(num), "subtract");
  }

  const evenOptionDivides = [2, 6, 14, 18, 398, 1998];
  for (const num of evenOptionDivides) {
    assertEquals(divideOrSubtractEven(num), "divide");
  }
});

tester.addTests(
  "return the number of cards player one will capture with minMaxing",
  () => {
    const scenarios: Array<[number, number]> = [
      // [1, 1],
      // [2, 1],
      // [3, 2],
      [4, 3],
      // [5, 2],
      // [6, 4],
      // [10, 8],   // example from the problem statement
      // [14, 11],  // even that halves to an odd
      // [24, 20],  // multiple of 4: best move is subtract first
      // [400, 391] // large stack stress-test
    ];

    for (const [cards, expected] of scenarios) {
      assertEquals(getMaximumCardsCollectable(cards), expected);
    }
  },
);

tester.runTests();

// describe("Card Game", () => {
//     test("choose best option for <2", () => {
//         expect(getMaximumCardsCollectable(1)).toBe(1);
//         expect(getMaximumCardsCollectable(2)).toBe(1);
//         expect(getMaximumCardsCollectable(3)).toBe(2);
//         expect(getMaximumCardsCollectable(4)).toBe(3);
//         expect(getMaximumCardsCollectable(5)).toBe(2);
//     })

//     test("simulate the best decision given the current number of cards", () => {
//         expect()
//     })
// })
