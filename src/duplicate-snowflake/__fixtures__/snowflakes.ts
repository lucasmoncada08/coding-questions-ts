import { Snowflake, SixNumbers } from "../snowflake";

export const linearPoints: SixNumbers = [0, 1, 2, 3, 4, 5];

export function rotatePointsLeft(points: SixNumbers, shift: number): SixNumbers {
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

const make = (p: SixNumbers) => new Snowflake(p);

export const fixtures = {
  linear: {
    basePoints: linearPoints,
    baseSnowflake: make(linearPoints),

    trueDuplicatesPoints: [
      rotatePointsLeft(linearPoints, 1),
      rotatePointsLeft(linearPoints, 3),
      flipPoints(linearPoints),
      rotatePointsLeft(flipPoints(linearPoints), 2),
    ] as SixNumbers[],

    falseDuplicatesPoints: [
      tweak(linearPoints, 0, +1),
      tweak(rotatePointsLeft(linearPoints, 2), 2, +1),
      tweak(flipPoints(linearPoints), 1, -2),
    ],

    get trueDuplicates(): Snowflake[] {
      return this.trueDuplicatesPoints.map(make);
    },
    get falseDuplicates(): Snowflake[] {
      return this.falseDuplicatesPoints.map(make);
    },
    get all(): Snowflake[] {
      return [this.baseSnowflake, ...this.trueDuplicates, ...this.falseDuplicates];
    },
  },
} as const;
