import { Snowflake } from "./snowflake";

export class SnowflakeCollection {
  snowflakes: Snowflake[];

  constructor(snowflakes: Snowflake[]) {
    this.snowflakes = snowflakes;
  }

  *[Symbol.iterator](): IterableIterator<Snowflake> {
    yield* this.snowflakes;
  }

  checkDuplicateInPlace(sf1: Snowflake, sf2: Snowflake, sf2Offset: number = 0) {
    const sf2OffsetPoints = sf2.getPointsAfterOffset(sf2Offset);
    for (let i = 0; i < sf1.points.length; i++) {
      // console.log(`comparing sf1.points[i]: ${sf1.points[i]} with sf2.points[i+sf2Offset % sf2.points.length]: ${sf2.points[i+sf2Offset % sf2.points.length-1]}`)
      // console.log(`i+sf2Offset, sf2.points.length-1: ${i+sf2Offset}, ${sf2.points.length-1}`)
      // console.log((i+sf2Offset) % (sf2.points.length - 1))
      if (sf1.points[i] !== sf2OffsetPoints[i]) {
        return false;
      }
    }
    return true;
  }
}
