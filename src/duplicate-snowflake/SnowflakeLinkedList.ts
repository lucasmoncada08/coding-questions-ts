import { Snowflake } from "./snowflake";

export class SnowflakeLinkedListNode {
    snowflake: Snowflake;
    nextSnowflake: SnowflakeLinkedListNode | null;

    constructor(snowflake: Snowflake) {
        this.snowflake = snowflake;
        this.nextSnowflake = null;
    }
}