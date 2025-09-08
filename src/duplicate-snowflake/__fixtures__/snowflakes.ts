import { Snowflake, SixNumbers, PointsIndex } from "../snowflake";

export const linearPoints: SixNumbers = [0, 1, 2, 3, 4, 5];

export function rotatePointsLeft(
  points: SixNumbers,
  shift: number,
): SixNumbers {
  const n = points.length;
  const s = ((shift % n) + n) % n; // normalize to 0..n-1
  return [...points.slice(s, n), ...points.slice(0, s)] as SixNumbers;
}

export function flipPoints(points: SixNumbers): SixNumbers {
  return [...points].reverse() as SixNumbers;
}

export function tweak(
  points: SixNumbers,
  index: number,
  delta: number,
): SixNumbers {
  const copy = [...points] as number[];
  copy[index] = copy[index] + delta;
  return copy as SixNumbers;
}

export function swapPoints(
  points: SixNumbers,
  firstIndex: PointsIndex,
  secondIndex: PointsIndex,
): SixNumbers {
  const copy = [...points] as SixNumbers;
  [copy[firstIndex], copy[secondIndex]] = [copy[secondIndex], copy[firstIndex]];
  return copy as SixNumbers;
}

const make = (p: SixNumbers) => new Snowflake(p);

export const fixtures = {
  linear: {
    basePoints: linearPoints,
    baseSnowflake: make(linearPoints),

    // Named scenarios for clarity + direct access
    trueDuplicatesPointsByName: {
      rotateLeft1: rotatePointsLeft(linearPoints, 1),
      rotateLeft3: rotatePointsLeft(linearPoints, 3),
      flipped: flipPoints(linearPoints),
      flipRotate2: rotatePointsLeft(flipPoints(linearPoints), 2),
    } as const satisfies Record<string, SixNumbers>,

    falseDuplicatesPointsByName: {
      incrementFirst: tweak(linearPoints, 0, +1),
      rotated2ThenTweakIndex2Plus1: tweak(
        rotatePointsLeft(linearPoints, 2),
        2,
        +1,
      ),
      flippedThenTweakIndex1Minus2: tweak(flipPoints(linearPoints), 1, -2),
      swapFirstTwo: swapPoints(linearPoints, 0, 1),
      sameSum: swapPoints(linearPoints, 0, 2),
    } as const satisfies Record<string, SixNumbers>,

    // Backward-compatible arrays for iteration
    get trueDuplicatesPoints(): SixNumbers[] {
      return Object.values(this.trueDuplicatesPointsByName);
    },
    get falseDuplicatesPoints(): SixNumbers[] {
      return Object.values(this.falseDuplicatesPointsByName);
    },

    get trueDuplicates(): Snowflake[] {
      return this.trueDuplicatesPoints.map(make);
    },
    get falseDuplicates(): Snowflake[] {
      return this.falseDuplicatesPoints.map(make);
    },
    get all(): Snowflake[] {
      return [
        this.baseSnowflake,
        ...this.trueDuplicates,
        ...this.falseDuplicates,
      ];
    },

    // Named Snowflake accessors for tests
    get trueDuplicatesByName(): Record<string, Snowflake> {
      return Object.fromEntries(
        Object.entries(this.trueDuplicatesPointsByName).map(([k, v]) => [
          k,
          make(v),
        ]),
      );
    },
    get falseDuplicatesByName(): Record<string, Snowflake> {
      return Object.fromEntries(
        Object.entries(this.falseDuplicatesPointsByName).map(([k, v]) => [
          k,
          make(v),
        ]),
      );
    },
  },
} as const;
