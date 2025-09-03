import { bench, describe } from "vitest";
import {
  BruteForceDuplicationCheck,
  HashMapDuplicationCheck,
} from "./SnowflakeAnalyzer";
import { Snowflake, SixNumbers } from "./snowflake";
import { rotatePointsLeft, flipPoints } from "./__fixtures__/snowflakes";

// Deterministic PRNG for reproducible datasets
let seed = 42 >>> 0;
function randInt(max: number) {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed % max;
}

const VALUE_RANGE = 1_000_000;

function makeRandomSnowflake(): Snowflake {
  const p = [
    randInt(VALUE_RANGE),
    randInt(VALUE_RANGE),
    randInt(VALUE_RANGE),
    randInt(VALUE_RANGE),
    randInt(VALUE_RANGE),
    randInt(VALUE_RANGE),
  ] as SixNumbers;
  return new Snowflake(p);
}

function datasetNoDuplicates(n: number): Snowflake[] {
  const arr: Snowflake[] = [];
  for (let i = 0; i < n; i++) arr.push(makeRandomSnowflake());
  return arr;
}

function datasetWithLateRotateDuplicate(n: number): Snowflake[] {
  if (n < 2) return datasetNoDuplicates(n);
  const arr = datasetNoDuplicates(n - 1);
  const base = arr[0];
  arr.push(new Snowflake(rotatePointsLeft(base.points, 1)));
  return arr;
}

function datasetWithLateFlipDuplicate(n: number): Snowflake[] {
  if (n < 2) return datasetNoDuplicates(n);
  const arr = datasetNoDuplicates(n - 1);
  const base = arr[0];
  arr.push(new Snowflake(flipPoints(base.points)));
  return arr;
}

const sizes = [250, 2000];

for (const n of sizes) {
  const noDup = datasetNoDuplicates(n);
  const rotateDup = datasetWithLateRotateDuplicate(n);
  const flipDup = datasetWithLateFlipDuplicate(n);

  describe(`[N=${n}] no duplicates`, () => {
    bench("BruteForce", () => {
      new BruteForceDuplicationCheck().findAnyDuplicateSnowflakes(noDup);
    });
    bench("HashMap (track+check)", () => {
      const a = new HashMapDuplicationCheck();
      a.findAnyDuplicateSnowflakes(noDup);
    });
  });

  describe(`[N=${n}] one late rotate-duplicate`, () => {
    bench("BruteForce", () => {
      new BruteForceDuplicationCheck().findAnyDuplicateSnowflakes(rotateDup);
    });
    bench("HashMap (track+check)", () => {
      const a = new HashMapDuplicationCheck();
      a.findAnyDuplicateSnowflakes(rotateDup);
    });
  });

  describe(`[N=${n}] one late flip-duplicate`, () => {
    bench("BruteForce", () => {
      new BruteForceDuplicationCheck().findAnyDuplicateSnowflakes(flipDup);
    });
    bench("HashMap (track+check)", () => {
      const a = new HashMapDuplicationCheck();
      a.findAnyDuplicateSnowflakes(flipDup);
    });
  });
}
