import { describe, test, expect } from "vitest";
import { Snowflake, SixNumbers } from "./snowflake";
import {
  checkDuplicateSnowflake,
  checkDuplicateInPlace,
  checkDuplicateReversed,
  checkDuplicateRotated,
  handleOverlapWithOffset,
} from "./duplicateSnowflake";
import { SnowflakeCollection } from "./SnowflakeCollection";
import { BruteForceDuplicationCheck } from "./SnowflakeAnalyzer";

const SNOWFLAKE_NUM_OF_POINTS = 6;

type numberToNumber = (i: number) => number;
function makeSixNumbers(fn: numberToNumber): SixNumbers {
  return [...Array(SNOWFLAKE_NUM_OF_POINTS)].map((_, i) => fn(i)) as SixNumbers;
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
    const linearPointsRotatedOne = makeSixNumbers((i) => (i + 1) % 6);

    const bruteForceAnalyzer = new BruteForceDuplicationCheck();
    expect(
      bruteForceAnalyzer.getPointsAfterOffset(new Snowflake(linearPoints), 1),
    ).toStrictEqual(linearPointsRotatedOne);
  });

  test("check if 2 snowflakes are duplicates after known offset", () => {
    const linearPoints = makeSixNumbers((i) => i);
    const linearPointsRotatedByOne = makeSixNumbers(
      (i) => (i + 1) % Snowflake.numPoints,
    );

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

    const linearPointsRotatedByThree = makeSixNumbers((i) => (i + 3) % 6);
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
    const linearPointsRotatedByOne = makeSixNumbers(
      (i) => (i + 1) % Snowflake.numPoints,
    );
    const bruteForceAnalyzer = new BruteForceDuplicationCheck();
    expect(
      bruteForceAnalyzer.findDuplicatePointsWithOffset(
        new Snowflake(linearPoints),
        new Snowflake(linearPointsRotatedByOne),
        1,
      ),
    ).toBe(true);

    const linearPointsRotatedByFive = makeSixNumbers(
      (i) => (i + 5) % Snowflake.numPoints,
    );
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
