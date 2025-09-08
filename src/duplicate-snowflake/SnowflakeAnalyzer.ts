import { Snowflake, SixNumbers } from "./snowflake";
import { SnowflakeLinkedListNode } from "./SnowflakeLinkedList";

export interface SnowflakeDuplicateStrategy {
  findAnyDuplicateSnowflakes(snowflakes: Snowflake[]): boolean;
}

export abstract class GenericDuplicateStrategy
  implements SnowflakeDuplicateStrategy
{
  abstract findAnyDuplicateSnowflakes(snowflakes: Snowflake[]): boolean;

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
      ...snowflake.points.slice(offset, Snowflake.POINTS_PER_SNOWFLAKE),
      ...snowflake.points.slice(0, offset),
    ] as SixNumbers;
  }

  findDuplicatePointsWithOffset(
    sf1: Snowflake,
    sf2: Snowflake,
    startOffset: number,
  ): boolean {
    for (let i = startOffset; i < Snowflake.POINTS_PER_SNOWFLAKE; i++) {
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

export class BruteForceDuplicationCheck extends GenericDuplicateStrategy {
  findAnyDuplicateSnowflakes(snowflake: Snowflake[]) {
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
}

export class HashMapDuplicationCheck extends GenericDuplicateStrategy {
  snowflakeMap: Map<number, SnowflakeLinkedListNode> = new Map();
  duplicateHashesFound: Set<number> = new Set();

  getSnowflakeHash(snowflake: Snowflake): number {
    return this.getSumOfPoints(snowflake.points);
  }

  trackSnowflakeHash(snowflake: Snowflake, trackSameHashes: boolean): number {
    const snowflakeHash: number = this.getSnowflakeHash(snowflake);
    const snowflakeLinkedListNode = new SnowflakeLinkedListNode(snowflake);
    const hashLLHead = this.snowflakeMap.get(snowflakeHash);
    if (hashLLHead) {
      if (trackSameHashes)
        this.duplicateHashesFound.add(snowflakeHash);
      snowflakeLinkedListNode.nextSnowflakeNode = hashLLHead;
    }
    this.snowflakeMap.set(snowflakeHash, snowflakeLinkedListNode);
    return snowflakeHash;
  }

  private getSumOfPoints(snowflakePoints: SixNumbers): number {
    let sum = 0;
    for (const point of snowflakePoints) {
      sum += point;
    }
    return sum;
  }

  retrieveSnowflakeNode(snowflake: Snowflake): SnowflakeLinkedListNode | null {
    return this.snowflakeMap.get(this.getSnowflakeHash(snowflake)) || null;
  }

  findAnyDuplicateSnowflakes(snowflakes: Snowflake[], trackSameHashes: boolean=true): boolean {
    for (const sf of snowflakes) {
      this.trackSnowflakeHash(sf, trackSameHashes);
    }
    return this.hasDuplicatesInSnowflakeMap();
  }

  hasDuplicatesInSnowflakeMap(useSameHashes: boolean): boolean {
    if (useSameHashes)
      return this.checkMultiHashEntriesOnly();
    else
      return this.checkAllEntriesInSnowflakeMap()
  }

  checkMultiHashEntriesOnly(): boolean {
    for (const hashWithDuplicateSFs of this.duplicateHashesFound.keys()) {
     if (this.foundDuplicateSnowflakeInLinkedList(this.snowflakeMap.get(hashWithDuplicateSFs)!))
      return true;
    }
    return false;
  }

  foundDuplicateSnowflakeInLinkedList(snowflakeNode: SnowflakeLinkedListNode): boolean {
    let nextNodeToCompare = snowflakeNode.nextSnowflakeNode;
    while (nextNodeToCompare) {
      if (
        this.findDuplicateSnowflakesInAllConfigurations(
          snowflakeNode.snowflake,
          nextNodeToCompare.snowflake,
        )
      )
        return true;
      nextNodeToCompare = nextNodeToCompare.nextSnowflakeNode;
    }
    return false;
  }

  checkAllEntriesInSnowflakeMap(): boolean {
    for (const snowflakeNode of this.snowflakeMap.values()) {
      if (this.foundDuplicateSnowflakeInLinkedList(snowflakeNode))
        return true;
    }
    return false;
  }

  findDuplicateSnowflakesInAllConfigurations(
    snowflakeOne: Snowflake,
    snowflakeTwo: Snowflake,
  ) {
    if (this.compareSnowflakePoints(snowflakeOne.points, snowflakeTwo.points)) {
      return true;
    }
    if (this.findDuplicatePointsWithOffset(snowflakeOne, snowflakeTwo, 1)) {
      return true;
    }
    if (this.findDuplicatePointsFlipped(snowflakeOne, snowflakeTwo)) {
      return true;
    }
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
    const name = String(context.name);
    try {
      console.log(`Calling ${name} with arguments:`, ...args);
    } catch {
      console.log(`Calling ${name} with <unprintable args>`);
    }

    // Narrow Promise-like without using `any`.
    const isPromiseLike = (value: unknown): value is PromiseLike<unknown> =>
      typeof (value as { then?: unknown }).then === "function";

    try {
      const result = original.apply(this, args);
      if (isPromiseLike(result)) {
        return result.then(
          (value) => {
            console.log(`Finished ${name}`);
            return value;
          },
          (err) => {
            console.log(`Finished ${name} with error`);
            throw err;
          },
        ) as unknown as R;
      }
      // For sync methods: log after successful execution.
      console.log(`Finished ${name}`);
      return result;
    } catch (error) {
      // For sync errors: log before rethrowing.
      console.log(`Finished ${name} with error`);
      throw error;
    }
  };
}
