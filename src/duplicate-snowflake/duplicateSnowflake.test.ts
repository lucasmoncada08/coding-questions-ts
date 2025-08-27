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

const SNOWFLAKE_NUM_OF_POINTS = 6;

type numberToNumber = (i: number) => number;
function makeSixNumbers(fn: numberToNumber): SixNumbers {
    return [...Array(SNOWFLAKE_NUM_OF_POINTS)].map((_, i) => fn(i)) as SixNumbers;
}

describe("Snowflake basics", () => {

    test("create snowflake with points", () => {
        const points = makeSixNumbers(i => i);
        const snowflake = new Snowflake(points);
        expect(snowflake.points).toEqual([0, 1, 2, 3, 4, 5]);
    })

    test("create a collection of snowflakes", () => {
        const pointsLinear = makeSixNumbers(i => i);

        const snowflakeCollection = new SnowflakeCollection(
            Array.from({ length: 5 }, () => new Snowflake(pointsLinear))
        )

        expect(snowflakeCollection.snowflakes).toHaveLength(5);
        for (const sf of snowflakeCollection) {
            expect(sf.points).toEqual(pointsLinear);
        }
    })

    test("check duplicate snowflake types in place", () => {
        const pointsOriginal: SixNumbers = [3, 4, 1, 8, 4, 3];
        const pointsDifferent: SixNumbers = [3, 4, 1, 2, 4, 3];
        const sfOriginal = new Snowflake(pointsOriginal);
        const sfSame = new Snowflake(pointsOriginal);
        const sfDifferent = new Snowflake(pointsDifferent);

        expect(checkDuplicateInPlace(sfOriginal, sfSame)).toBe(true);
        expect(checkDuplicateInPlace(sfOriginal, sfDifferent)).toBe(false);

        const pointsReversed: SixNumbers = [...pointsOriginal].reverse() as SixNumbers;
        const sfReversed = new Snowflake(pointsReversed);

        expect(checkDuplicateReversed(sfOriginal, sfReversed)).toBe(true);
        expect(checkDuplicateReversed(sfOriginal, sfDifferent)).toBe(false);
    })

    test("test overlap with offset function", () => {
        // mini ex. 08/27/25 [1, 2, 3] with offset:1 => [2, 3, 1]
        const linearPoints = makeSixNumbers(i => i);
        const offset = 1;
        const expected = [1, 2, 3, 4, 5, 0] as SixNumbers;
        const snowflake = new Snowflake(linearPoints);
        expect(snowflake.getPointsAfterOffset(offset)).toEqual(expected);
    })

    test.skip("check duplicate snowflake after rotation", () => {
        const pointsOriginal: SixNumbers = [1, 2, 3, 4, 5, 6];
        const pointsShiftLeftOne: SixNumbers = [...pointsOriginal.slice(1, 6), pointsOriginal[0]] as SixNumbers//   [2, 3, 4, 5, 6, 1];
        const pointsShiftRightThree: SixNumbers = [...pointsOriginal.slice(3, 6), ...pointsOriginal.slice(0, 3)] as SixNumbers;
        const pointsAlmostShifted: SixNumbers = [5, 6, 2, 3, 4, 1];

        expect(checkDuplicateRotated(new Snowflake(pointsOriginal), new Snowflake(pointsShiftLeftOne))).toBe(true);
        expect(checkDuplicateRotated(new Snowflake(pointsOriginal), new Snowflake(pointsShiftRightThree))).toBe(true);
        expect(checkDuplicateRotated(new Snowflake(pointsOriginal), new Snowflake(pointsAlmostShifted))).toBe(false);

        // const pointsFlippedShiftLeftTwo = []
    })
});