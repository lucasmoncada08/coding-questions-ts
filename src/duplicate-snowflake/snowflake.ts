export type SixNumbers = [number, number, number, number, number, number]; 
export class Snowflake {
    readonly points: SixNumbers;
    static numPoints: number = 6;

    constructor(points: SixNumbers) {
        this.points = points;
    }

    logPoints() {
        console.log(this.points);
    }

    getPointsAfterOffset(offset: number): SixNumbers {
        return [
            ...this.points.slice(offset, Snowflake.numPoints),
            ...this.points.slice(0, offset)
        ] as SixNumbers;
    }
}