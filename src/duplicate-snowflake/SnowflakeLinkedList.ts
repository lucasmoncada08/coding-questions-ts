import { Snowflake } from "./snowflake";

export class SnowflakeLinkedListNode {
  snowflake: Snowflake;
  nextSnowflakeNode: SnowflakeLinkedListNode | null;

  constructor(snowflake: Snowflake) {
    this.snowflake = snowflake;
    this.nextSnowflakeNode = null;
  }
}
