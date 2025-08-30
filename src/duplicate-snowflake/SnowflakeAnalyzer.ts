import { Snowflake, SixNumbers } from "./snowflake";

// export interface SnowflakeDuplicateStrategy {
//     compareSnowflakePoints(snowflakes: Snowflake[]): boolean;
// }

export class BruteForceDuplicationCheck {
  compareSnowflakes(snowflake: Snowflake[]) {
    for (let i = 0; i < snowflake.length - 1; i++) {
      for (let j = i + 1; j < snowflake.length; j++) {
        if (
          this.compareSnowflakePoints(snowflake[i].points, snowflake[j].points)
        ) {
          return true;
        }
        if (this.findDuplicatePointsWithOffset(snowflake[i], snowflake[j], 1)) {
          return true;
        }
        if (this.findDuplicatePointsFlipped(snowflake[i], snowflake[j])) {
          return true;
        }
      }
    }
    return false;
  }

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

  findDuplicatePointsWithOffset(
    sf1: Snowflake,
    sf2: Snowflake,
    startOffset: number,
  ): boolean {
    for (let i = startOffset; i < Snowflake.numPoints; i++) {
      const offsetSf1 = this.getPointsAfterOffset(sf1, i);
      const duplicateFound = this.compareSnowflakePoints(offsetSf1, sf2.points);
      if (duplicateFound) return true;
    }
    return false;
  }

  findDuplicatePointsFlipped(sf1: Snowflake, sf2: Snowflake) {
    const reversedSf1 = new Snowflake([...sf1.points].reverse() as SixNumbers);
    return this.findDuplicatePointsWithOffset(reversedSf1, sf2, 0);
  }
}

export function LogInputs<This, A extends unknown[], R>(
  original: (this: This, ...args: A) => R,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: A) => R>,
): (this: This, ...args: A) => R {
  if (context.kind !== "method" || context.private) {
    throw new Error("LogInputs can only be applied to public methods");
  }

  return function (this: This, ...args: A): R {
    try {
      console.log(`Calling ${String(context.name)} with arguments:`, ...args);
    } catch {
      console.log(`Calling ${String(context.name)} with <unprintable args>`);
    }
    return original.apply(this, args);
  };
}
