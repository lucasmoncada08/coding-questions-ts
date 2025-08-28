import { Snowflake } from "./snowflake"

export interface SnowflakeDuplicateStrategy {
    compareSnowflakes(snowflakes: Snowflake[]): boolean;
}

export class BruteForceDuplicationCheck implements SnowflakeDuplicateStrategy {
    compareSnowflakes(snowflakes: Snowflake[]): boolean {
        const sf1 = snowflakes[0];
        const sf2 = snowflakes[1];

        for (let i=0; i<sf1.points.length; i++) {
            if (sf1.points[i] !== sf2.points[i]) {
                return false;
            }
        }
        return true
    }
}