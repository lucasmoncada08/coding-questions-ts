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

function LogInputs<M extends (...args: unknown[]) => unknown>(
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<M>,
): void {
  const originalMethod = descriptor.value;
  if (typeof originalMethod !== "function") {
    throw new Error("LogInputs can only be applied to methods");
  }

  descriptor.value = function (
    this: ThisParameterType<M>,
    ...args: Parameters<M>
  ): ReturnType<M> {
    console.log(`Calling ${String(propertyKey)} with arguments:`, args);
    return originalMethod.apply(this, args) as ReturnType<M>;
  } as M;
}
