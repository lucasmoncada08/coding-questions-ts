import { Snowflake, SixNumbers } from "./snowflake";

export interface SnowflakeDuplicateStrategy {
  //   compareSnowflakePoints(snowflakes: Snowflake[]): boolean;
}

export class BruteForceDuplicationCheck implements SnowflakeDuplicateStrategy {
  compareSnowflakePoints(
    sfPoints1: SixNumbers,
    sfPoints2: SixNumbers,
  ): boolean {
    for (let i = 0; i < sfPoints1.length; i++) {
      if (sfPoints1[i] !== sfPoints2[i]) {
        return false;
      }
    }
    return true;
  }

  getPointsAfterOffset(snowflake: Snowflake, offset: number): SixNumbers {
    return [
      ...snowflake.points.slice(offset, Snowflake.numPoints),
      ...snowflake.points.slice(0, offset),
    ] as SixNumbers;
  }

  findDuplicatePointsWithOffset(sf1: Snowflake, sf2: Snowflake): boolean {
    for (let i = 1; i < Snowflake.numPoints; i++) {
      const offsetSf1 = this.getPointsAfterOffset(sf1, i);
      const duplicateFound = this.compareSnowflakePoints(offsetSf1, sf2.points);
      if (duplicateFound) return true;
    }
    return false;
  }
}
