import { Snowflake } from "./snowflake";

// class SnowflakeCollection

export function checkDuplicateSnowflake(sf1: Snowflake, sf2: Snowflake) {
  // check if duplicate in place
  // check if duplicate if rotated right
  // check if duplicate if rotated left
}

export function checkDuplicateInPlace(
  sf1: Snowflake,
  sf2: Snowflake,
  sf2Offset: number = 0,
) {
  for (let i = 0; i < sf1.points.length; i++) {
    console.log(
      `comparing sf1.points[i]: ${sf1.points[i]} with sf2.points[i+sf2Offset % sf2.points.length]: ${sf2.points[i + (sf2Offset % sf2.points.length) - 1]}`,
    );
    console.log(
      `i+sf2Offset, sf2.points.length-1: ${i + sf2Offset}, ${sf2.points.length - 1}`,
    );
    console.log((i + sf2Offset) % (sf2.points.length - 1));
    if (
      sf1.points[i] !== sf2.points[(i + sf2Offset) % (sf2.points.length - 1)]
    ) {
      return false;
    }
  }
  return true;
}

export function checkDuplicateReversed(sf1: Snowflake, sf2: Snowflake) {
  const endOfSf2 = sf2.points.length - 1;
  for (let i = 0; i < sf1.points.length; i++) {
    if (sf1.points[i] !== sf2.points[endOfSf2 - i]) return false;
  }
  return true;
}

export function checkDuplicateRotated(sf1: Snowflake, sf2: Snowflake) {
  sf1.logPoints();
  sf2.logPoints();
  for (let i = 0; i < sf2.points.length; i++) {
    console.log("checking sf2 at offset: " + i);
    if (checkDuplicateInPlace(sf1, sf2, i)) {
      return true;
    }
  }
  return false;
}

function logFnDecorator(fn: Function) {
  return function (...args: any[]) {
    console.log(`calling ${fn.name} with args ${JSON.stringify(args)}`);
  };
}
