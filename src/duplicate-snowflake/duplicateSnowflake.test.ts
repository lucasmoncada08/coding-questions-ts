import { describe, test, expect } from "vitest";
import { Snowflake, SixNumbers } from "./snowflake";
import { SnowflakeCollection } from "./SnowflakeCollection";
import { BruteForceDuplicationCheck } from "./SnowflakeAnalyzer";
import {
  fixtures,
  rotatePoints,
  flipPoints,
  linearPoints,
} from "./__fixtures__/snowflakes";

// Derive size from an instance to avoid static coupling
const BASE_SNOWFLAKE = new Snowflake(linearPoints);
const N = BASE_SNOWFLAKE.points.length;

type numberToNumber = (i: number) => number;
function makeSixNumbers(fn: numberToNumber): SixNumbers {
  return [...Array(N)].map((_, i) => fn(i)) as SixNumbers;
}

function makeSnowflake(fn: numberToNumber): Snowflake {
  return new Snowflake(makeSixNumbers(fn));
}

describe("Snowflake basics", () => {
  test("create snowflake with points", () => {
    const points = makeSixNumbers((i) => i);
    const snowflake = new Snowflake(points);
    expect(snowflake.points).toEqual([0, 1, 2, 3, 4, 5]);
  });

  test("create a collection of snowflakes", () => {
    const pointsLinear = makeSixNumbers((i) => i);

    const snowflakeCollection = new SnowflakeCollection(
      Array.from({ length: 5 }, () => new Snowflake(pointsLinear)),
    );

    expect(snowflakeCollection.snowflakes).toHaveLength(5);
    for (const sf of snowflakeCollection) {
      expect(sf.points).toEqual(pointsLinear);
    }
  });

  test("check 2 duplicate snowflake types in-place", () => {
    const pointsOriginal: SixNumbers = [3, 4, 1, 8, 4, 3];
    const pointsDifferent: SixNumbers = [3, 4, 1, 2, 4, 3];

    const bruteForceAnalyzer = new BruteForceDuplicationCheck();

    expect(
      bruteForceAnalyzer.compareSnowflakePoints(pointsOriginal, pointsOriginal),
    ).toBe(true);
    expect(
      bruteForceAnalyzer.compareSnowflakePoints(
        pointsOriginal,
        pointsDifferent,
      ),
    ).toBe(false);
  });

  test("snowflake points are rotated right by one", () => {
    const linearPoints = makeSixNumbers((i) => i);
    const linearPointsRotatedOne = makeSixNumbers((i) => (i + 1) % N);

    const bruteForceAnalyzer = new BruteForceDuplicationCheck();
    expect(
      bruteForceAnalyzer.getPointsAfterOffset(new Snowflake(linearPoints), 1),
    ).toStrictEqual(linearPointsRotatedOne);
  });

  test("check if 2 snowflakes are duplicates after known offset", () => {
    const linearPoints = makeSixNumbers((i) => i);
    const linearPointsRotatedByOne = makeSixNumbers((i) => (i + 1) % N);

    const bruteForceAnalyzer = new BruteForceDuplicationCheck();

    const offsetOnePoints = bruteForceAnalyzer.getPointsAfterOffset(
      new Snowflake(linearPoints),
      1,
    );
    expect(
      bruteForceAnalyzer.compareSnowflakePoints(
        offsetOnePoints,
        linearPointsRotatedByOne,
      ),
    ).toStrictEqual(true);

    const linearPointsRotatedByThree = makeSixNumbers((i) => (i + 3) % N);
    const offsetThreePoints = bruteForceAnalyzer.getPointsAfterOffset(
      new Snowflake(linearPoints),
      3,
    );
    expect(
      bruteForceAnalyzer.compareSnowflakePoints(
        offsetThreePoints,
        linearPointsRotatedByThree,
      ),
    ).toStrictEqual(true);
  });

  test("check if duplicate offset snowflakes are detected", () => {
    const linearPoints = makeSixNumbers((i) => i);
    const linearPointsRotatedByOne = makeSixNumbers((i) => (i + 1) % N);
    const bruteForceAnalyzer = new BruteForceDuplicationCheck();
    expect(
      bruteForceAnalyzer.findDuplicatePointsWithOffset(
        new Snowflake(linearPoints),
        new Snowflake(linearPointsRotatedByOne),
        1,
      ),
    ).toBe(true);

    const linearPointsRotatedByFive = makeSixNumbers((i) => (i + 5) % N);
    expect(
      bruteForceAnalyzer.findDuplicatePointsWithOffset(
        new Snowflake(linearPoints),
        new Snowflake(linearPointsRotatedByFive),
        1,
      ),
    ).toBe(true);

    const linearPointsIncrementedBy1 = makeSixNumbers((i) => i + 1);
    expect(
      bruteForceAnalyzer.findDuplicatePointsWithOffset(
        new Snowflake(linearPoints),
        new Snowflake(linearPointsIncrementedBy1),
        1,
      ),
    ).toBe(false);
  });

  test("check if the snowflake flipped is duplicate", () => {
    const linearPoints = makeSixNumbers((i) => i);
    const linearPointsReversed = [...linearPoints].reverse() as SixNumbers;

    const bruteForceAnalyzer = new BruteForceDuplicationCheck();

    expect(
      bruteForceAnalyzer.findDuplicatePointsFlipped(
        new Snowflake(linearPoints),
        new Snowflake(linearPointsReversed),
      ),
    ).toEqual(true);
  });
});

describe("comparing multiple snowflakes together", () => {
  test("comparing 2 duplicate snowflakes together", () => {
    const snowflakes: Snowflake[] = [
      makeSnowflake((i) => i),
      makeSnowflake((i) => (i + 1) % N), // shifted
    ];

    const bruteForceAnalyzer = new BruteForceDuplicationCheck();
    expect(bruteForceAnalyzer.compareSnowflakes(snowflakes)).toBe(true);
  });

  test("comparing 3 duplicate snowflakes together", () => {
    const snowflakes: Snowflake[] = [
      makeSnowflake((i) => i),
      makeSnowflake((i) => i % 4),
    ];

    const bruteForceAnalyzer = new BruteForceDuplicationCheck();
    expect(bruteForceAnalyzer.compareSnowflakes(snowflakes)).toBe(false);

    snowflakes.push(makeSnowflake((i) => (i + 3) % N)); // shifted
    expect(bruteForceAnalyzer.compareSnowflakes(snowflakes)).toBe(true);
  });

  // test("compare 5 duplicate snowflakes together", () => {
  //   const snowflakes: Snowflake[] = [
  //     makeSnowflake((i) => i),
  //   ];

  //   const bruteForceAnalyzer = new BruteForceDuplicationCheck();
  //   expect(bruteForceAnalyzer.compareSnowflakes(snowflakes)).toBe(true);
  // });

  // makeSnowflake(i => (-i-1) + Snowflake.numPoints), // reverse
});

describe("fixtures-based tests", () => {
  const bruteForceAnalyzer = new BruteForceDuplicationCheck();

  test("base linearPoints sanity", () => {
    expect(linearPoints).toEqual([0, 1, 2, 3, 4, 5]);
  });

  test("true duplicates are detected", () => {
    const base = fixtures.linear.base;
    for (const dup of fixtures.linear.trueDuplicates) {
      expect(bruteForceAnalyzer.compareSnowflakes([base, dup])).toBe(true);
    }
  });

  test("false duplicates are not detected", () => {
    const base = fixtures.linear.base;
    for (const notDup of fixtures.linear.falseDuplicates) {
      expect(bruteForceAnalyzer.compareSnowflakes([base, notDup])).toBe(false);
    }
  });

  test("helpers work: rotate/flip", () => {
    expect(rotatePoints(linearPoints, 1)).toEqual([1, 2, 3, 4, 5, 0]);
    expect(flipPoints(linearPoints)).toEqual([5, 4, 3, 2, 1, 0]);
  });
});
