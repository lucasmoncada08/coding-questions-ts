import { Snowflake } from "./snowflake";

export class SnowflakeCollection {
  snowflakes: Snowflake[];

  constructor(snowflakes: Snowflake[]) {
    this.snowflakes = snowflakes;
  }

  *[Symbol.iterator](): IterableIterator<Snowflake> {
    yield* this.snowflakes;
  }
}
